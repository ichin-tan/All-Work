//
//  Agent.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

class Agent {
    var agentID: Int
    var name: String
    var email: String
    var assignedProperties: [Property] = [] {
        didSet {
            self.setDescription()
        }
    }
    var boughtProperties: [Property] = [] {
        didSet {
            self.setDescription()
        }
    }
    var soldProperties: [Property] = [] {
        didSet {
            self.setDescription()
        }
    }
    var earnedCommision: Double {
        var totalCommision = 0.0
        for property in self.soldProperties {
            let propertyCommision = (property.sellingPrice * 5) / 100
            totalCommision += propertyCommision
        }
        return totalCommision
    }
    
    var description: [String: Any] = [:]
    
    init(agentID: Int, name: String, email: String) {
        self.agentID = agentID
        self.name = name
        self.email = email
        self.setDescription()
        print("Agent created successfully with id: \(self.agentID)!")
    }

    func setDescription() {
        self.description["agentID"] = self.agentID
        self.description["agentName"] = self.name
        self.description["email"] = self.email
        self.description["assignedProperties"] = self.assignedProperties.map({ $0.propertyID })
        self.description["boughtProperties"] = self.boughtProperties.map({ $0.propertyID })
        self.description["soldProperties"] = self.soldProperties.map({ $0.propertyID })
        self.description["commisionEarned"] = self.earnedCommision
    }
    
    func showDescription() {
        print("Agent - \(self.description)")
    }
    
    func buyProperty(property: Property?) throws {
        if let property = property {
            if (property.assignedAgent == nil) {
                throw AgentError.buyError("You can not buy this property as it doesnt have a assigned agent!")
            } else if (property.assignedAgent?.agentID == self.agentID) {
                throw AgentError.buyError("You can not buy this property as you are assigned and selling this property!")
            } else {
                self.boughtProperties.append(property)
                self.showDescription()
                print("Property bought successfully by \(self.name)!")
            }
        } else {
            throw AgentError.buyError("Couldn't find property to buy!")
        }
    }
    
    func sellProperty(property: Property?) throws {
        if let property = property {
            if (self.assignedProperties.contains(where: { $0.propertyID == property.propertyID })) {
                self.soldProperties.append(property)
                property.sellingAgent = self
                print("Property Sold by \(self.name)!")
                property.showDescription()
                self.showDescription()
            } else {
                throw AgentError.sellError("You can not sell this property as this property is not assigned to you!")
            }
        } else {
            throw AgentError.sellError("Couldn't find property to sell!")
        }
    }
}
