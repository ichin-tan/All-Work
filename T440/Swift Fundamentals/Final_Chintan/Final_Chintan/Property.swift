//
//  Property.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

class Property {
    var propertyID: Int
    var address: String
    var area: Double
    var sellingPrice: Double
    var assignedAgent: Agent? {
        didSet {
            self.setDescription()
        }
    }
    var sellingAgent: Agent? {
        didSet {
            self.setDescription()
        }
    }
    var propertyType: PropertyType
    var description: [String: Any] = [:]
    
    init?(propertyID: Int, address: String, area: Double, sellingPrice: Double, propertyType: PropertyType) {
        
        if(address == "") {
            print("Couldn't make property as address cannot be empty!")
            return nil
        }
        
        if(area <= 0) {
            print("Couldn't make property as area cannot be less than 0 or 0!")
            return nil
        }

        if(sellingPrice < 0) {
            print("Couldn't make property as price cannot be less than 0!")
            return nil
        }
                
        self.propertyID = propertyID
        self.address = address
        self.area = area
        self.sellingPrice = sellingPrice
        self.propertyType = propertyType
        self.setDescription()
    }
    
    func setDescription() {
        self.description["propertyID"] = self.propertyID
        self.description["address"] = self.address
        self.description["area"] = self.area
        self.description["sellingPrice"] = self.sellingPrice
        self.description["assignedAgent"] = self.assignedAgent?.name
        self.description["sellingAgentName"] = self.sellingAgent?.name
        self.description["propertyType"] = self.propertyType
    }
    
    func showDescription() {
        print("Property: - \(self.description)")
    }
}
