//
//  Manager.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

class Manager {
    
    var properties: [Property] = []
    var agents: [Agent] = []

    init() {
        print("Property Manager created!")
    }
    
    func addProperty(property: Property?) {
        if let property = property {
            self.properties.append(property)
            print("Property Added Successfully!")
        } else {
            print("Property couldn't be added!")
        }
    }

    func addAgent(agent: Agent?) {
        if let agent = agent {
            self.agents.append(agent)
            print("Agent Added Successfully!")
        } else {
            print("Agent couldn't be added!")
        }
    }
    
    func updateProperty(propertyID: Int, newPrice: Double) {
        let propertyToUpdate = self.properties.first(where: { $0.propertyID == propertyID })
        
        if let property = propertyToUpdate {
            property.sellingPrice = newPrice
            print("Property Updated Successfully!")
            property.setDescription()
        } else {
            print("Couldn't find the property to update!")
        }
    }

    func removeProperty(propertyToDelete: inout Property?) {
        if let property = self.properties.first(where: { $0.propertyID == propertyToDelete?.propertyID }) {
            self.properties.removeAll(where: { $0.propertyID == property.propertyID })
            property.assignedAgent?.assignedProperties.removeAll(where: { $0.propertyID == property.propertyID })
            propertyToDelete = nil
            print("Property Deleted Successfully!")
        } else {
            print("Couldn't find the property to delete!")
        }
    }
    
    func assignAgentToProperty(agent: Agent, propertyID: Int) {
        if let property = self.properties.first(where: { $0.propertyID == propertyID }) {
            property.assignedAgent = agent
            agent.assignedProperties.append(property)
            print("Assigned \(agent.name) to Property - \(property.propertyID)!")
        } else {
            print("Could't assign agent!")
        }
    }
    
    func searchProperties(type: PropertyType, address: String, maximumPrice: Double) -> [Property] {
        
        var searchedProperties : [Property] = []
        let isAddressFilter = address != ""
        let isMaxPriceFilter = !(maximumPrice <= 0)
        
        for property in self.properties {
            if(type == property.propertyType) {
                if(isAddressFilter) {
                    if(address == property.address) {
                        if(isMaxPriceFilter) {
                            if(property.sellingPrice <= maximumPrice) {
                                searchedProperties.append(property)
                            }
                        } else {
                            searchedProperties.append(property)
                        }
                    }
                } else {
                    if(isMaxPriceFilter) {
                        if(property.sellingPrice <= maximumPrice) {
                            searchedProperties.append(property)
                        }
                    } else {
                        searchedProperties.append(property)
                    }
                }
            }
        }
        return searchedProperties
    }
    
    func showAllPropertiesSortedBySellingPrice() {
        print("\n== Showing All Properties by sorting according to price in ascending order ==")
        let sortedProperties = self.properties.sorted { $0.sellingPrice < $1.sellingPrice }
        for property in sortedProperties {
            property.showDescription()
        }
    }
    
    func displayHighestEarningAgent() {
        let sortedAgents = self.agents.sorted(by: { $0.earnedCommision > $1.earnedCommision })
        if let highestEarnedAgent = sortedAgents.first {
            highestEarnedAgent.showDescription()
        } else {
            print("Couldn't display highest earned agent!")
        }
    }
}
