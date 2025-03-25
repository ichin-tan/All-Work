//
//  CommercialProperty.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

class CommercialProperty: Property, PropertyDescriptionProtocol {
    
    var shelveCount: Int
    var exitCount: Int
    var storeyCount: Int
    var commercialPropertyType: CommercialPropertyType
    
    init?(propertyID: Int, address: String, area: Double, sellingPrice: Double, shelveCount: Int, exitCount: Int, storeyCount: Int, commercialPropertyType: CommercialPropertyType) {
        
        self.shelveCount = shelveCount
        self.exitCount = exitCount
        self.storeyCount = storeyCount
        self.commercialPropertyType = commercialPropertyType
        super.init(propertyID: propertyID, address: address, area: area, sellingPrice: sellingPrice, propertyType: .commercial)
        self.setDescription()
        print("Commercial Property created successfully with Id: \(self.propertyID)!")
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
        self.description["shelveCount"] = self.shelveCount
        self.description["exitCount"] = self.exitCount
        self.description["storeyCount"] = self.storeyCount
        self.description["commercialPropertyType"] = self.commercialPropertyType
    }    
}
