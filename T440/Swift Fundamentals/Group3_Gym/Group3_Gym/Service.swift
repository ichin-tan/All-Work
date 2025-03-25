//
//  Service.swift
//  Group3_Gym
//
//  Created by CP on 21/01/25.
//

import Foundation

protocol isPurchasable {
    var serviceInfo: Service { get }
    func printReceipt(type: ReceiptType, by member: Memeber)
}

enum ReceiptType: String {
    case CANCELLATION = "CANCELLATION"
    case BOOKING = "BOOKING"
}

class Service: CustomStringConvertible, isPurchasable {
    var serviceInfo: Service {
        return self
    }
    var id: String = UUID().uuidString
    var name: String
    var fees: Double
    var description: String
    
    init(name: String, fees: Double) {
        self.name = name
        self.fees = fees
        
        self.description = "Service Id: \(self.id),\nService Name: \(self.name)\nService Fees: $ \(self.fees)\n"
    }
    
    func printReceipt(type: ReceiptType, by member: Memeber) {
        print("=== Receipt ===")
        print("Type: \(type)")
        print("Service: \(self.serviceInfo)")
        switch (type) {
        case .BOOKING:
            print("\(self.name) is booked by \(member.name)!")
            print("$\(self.fees) deducted from \(member.name)'s account!")
        case .CANCELLATION:
            print("\(self.name) is cancelled by \(member.name)!")
            print("$\(self.fees) added in \(member.name)'s account!")
        }
        print("Total amount remaining in \(member.name)'s account is: $\(member.account.creditPoints)")
        print("---")
    }
}

class FitnessClassesService : Service {
    var trainerName: String
    var durationOfClassInHour: Float
    var numberOfSessionAttended = 0
    var numberOfTotalSessions = 5
    
    init(name: String, fees: Double, trainerName: String, durationOfClassInHour: Float) {
        self.trainerName = trainerName
        self.durationOfClassInHour = durationOfClassInHour
        super.init(name: name, fees: fees)
        
        super.description += "Trainer Name: \(self.trainerName)\nClass Hours: \(self.durationOfClassInHour)\n"
    }
}

class PersonalTrainingService : Service {
    var trainerName: String
    var sessionTime: String
    var isTrainingstart = false
    var numberOfTimesAttended = 0
    var totalTimesToAttend = 5

    init(name: String, fees: Double,trainerName: String, sessionTime: String) {
        self.trainerName = trainerName
        self.sessionTime = sessionTime
        super.init(name: name, fees: fees)
        super.description += "Trainer Name: \(self.trainerName)\nSession Time: \(self.sessionTime)\n"
    }
}
