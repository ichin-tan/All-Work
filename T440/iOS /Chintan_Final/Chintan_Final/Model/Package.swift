//
//  Package.swift
//  Chintan_Final
//
//  Created by CP on 11/02/25.
//

import Foundation

class Package: Identifiable, Codable {
    var id = UUID().uuidString
    var packageId: Int
    var deliveryAddress: String
    var deliveryDate: Date
    var carrier: String
    var deliveredStatus: DelieveryStatus = .InTransit
                    
    init(packageId: Int, deliveryAddress: String, deliveryDate: Date, carrier: String, deliveredStatus: DelieveryStatus) {
        self.packageId = packageId
        self.deliveryAddress = deliveryAddress
        self.deliveryDate = deliveryDate
        self.carrier = carrier
        self.deliveredStatus = deliveredStatus
    }
    
    init(id: String, packageId: Int, deliveryAddress: String, deliveryDate: Date, carrier: String, deliveredStatus: DelieveryStatus) {
        self.id = id
        self.packageId = packageId
        self.deliveryAddress = deliveryAddress
        self.deliveryDate = deliveryDate
        self.carrier = carrier
        self.deliveredStatus = deliveredStatus
    }
}
