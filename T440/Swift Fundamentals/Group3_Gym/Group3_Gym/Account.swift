//
//  Account.swift
//  Group3_Gym
//
//  Created by CP on 21/01/25.
//

import Foundation

class Account: CustomStringConvertible {
    var id = UUID().uuidString
    var creditPoints: Double = 100
    var accountHolderId: String
    var description = ""
        
    init(accountHolderId: String) {
        self.accountHolderId = accountHolderId
        self.setDescription()
    }
    
    func setDescription() {
        self.description = "\nAccount Id: \(self.id)\nAccount Balance: $ \(self.creditPoints)\nAccount Holder Id: \(self.accountHolderId)"
    }
    
    func loadFunds(of amount: Double) {
        self.creditPoints += amount
        self.setDescription()
    }
    
    func deductServiceFees(service: Service) {
        self.creditPoints -= service.fees
        self.setDescription()
    }
    
}
