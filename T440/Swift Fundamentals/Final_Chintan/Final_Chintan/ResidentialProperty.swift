//
//  ResidentialProperty.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

class ResidentialProperty: Property, PropertyDescriptionProtocol {
    
    var bedroomCount: Int
    var bathroomCount: Int
    var residentialPropertyType: ResidentialPropertyType
    
    init?(propertyID: Int, address: String, area: Double, sellingPrice: Double, bedroomCount: Int, bathroomCount: Int, residentialPropertyType: ResidentialPropertyType) {
        if(bedroomCount == 0) {
            print("Couldn't make property as bedrooms cannot be 0!")
            return nil
        }
        self.bedroomCount = bedroomCount
        self.bathroomCount = bathroomCount
        self.residentialPropertyType = residentialPropertyType
        super.init(propertyID: propertyID, address: address, area: area, sellingPrice: sellingPrice, propertyType: .residential)
        self.setDescription()
        print("Residential Property created successfully with Id: \(self.propertyID)!")
    }
    
    func showPropertyInfo() {
        print(self.description)
    }
    
    func getCommission() -> Double {
        let commision = (self.sellingPrice * 5) / 100
        return commision
    }
    
    override func setDescription() {
        super.setDescription()
        self.description["bedroomCount"] = self.bedroomCount
        self.description["bathroomCount"] = self.bathroomCount
        self.description["residentialPropertyType"] = self.residentialPropertyType
    }
}
