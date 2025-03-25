//
//  Memeber.swift
//  Group3_Gym
//
//  Created by CP on 21/01/25.
//

import Foundation

class Memeber: CustomStringConvertible {
    
    var id: String
    var name: String
    var email: String
    var age: Int
    var gender: String
    var account: Account
    var enrolledServices: [Service] = []
    var description: String = ""
    
    init(id: String, name: String, email: String, age: Int, gender: String, account: Account) {
        self.id = id
        self.name = name
        self.email = email
        self.age = age
        self.gender = gender
        self.account = account
        self.setDescription()        
    }
    
    func setDescription() {
        self.description = "\nMember Id: \(self.id)\nMember Name: \(self.name)\nEmail: \(self.email)\nMember Age: \(self.age)\nMember Gender: \(self.gender)\nMember Account: \(self.account)\nMember Services: \(self.enrolledServices)\n"
    }
    
    func seeAccount() {
        print("My Enrolled Services ---- ")
        var count = 0
        for service in self.enrolledServices {
            count += 1
            print("\(count)\n\(service)")
            if let fService = service as? FitnessClassesService {
                print("Number Of Sessions Attended = \(fService.numberOfSessionAttended)!")
                print("Total Sessions = \(fService.numberOfTotalSessions)")
            } else if let tService = service as? PersonalTrainingService {
                print("Is Training Started? = \(tService.isTrainingstart)!")
                print("Number of Times Attended = \(tService.numberOfTimesAttended)")
                print("Total Times to attend = \(tService.totalTimesToAttend)")
            }
        }
        if (count == 0) {
            print("You are not enrolled in any service!")
        }
        print("My Account Balance ---- ")
        print(self.account.creditPoints)
    }
    
    func loadFundsInAccount() {
        print("Enter Funds to Load ---- ")
        let funds: Double = Double(readLine() ?? "") ?? 0.0
        if (funds == 0.0) {
            print("Funds Can not be Zero! Try Again!")
            return
        }
        self.account.loadFunds(of: funds)
        self.setDescription()
        print("Successfully Loaded funds of $ \(funds) in \(self.name)'s account!")
        print("Total balance in \(self.name)'s Account is \(self.account.creditPoints)!")
    }
    
    func bookService(service: Service) {
        self.enrolledServices.append(service)
        self.account.deductServiceFees(service: service)
        self.setDescription()
        service.printReceipt(type: .BOOKING, by: self)
    }
    
    func cancelService(service: Service) {
        if let fitnessService = self.enrolledServices.first(where: { $0.id == service.id }) as? FitnessClassesService {
            if(fitnessService.numberOfSessionAttended > 1) {
                print("Sorry you cannot cancel this service as you have attended more than 1 sessions!")
            } else {
                self.account.loadFunds(of: fitnessService.fees)
                self.enrolledServices.removeAll(where: { $0.id == service.id })
                self.setDescription()
                fitnessService.printReceipt(type: .CANCELLATION, by: self)
            }
        } else if let trainingService = self.enrolledServices.first(where: { $0.id == service.id }) as? PersonalTrainingService {
            if(trainingService.isTrainingstart) {
                print("Sorry you cannot cancel this service as your training sessions are already start!")
            } else {
                self.account.loadFunds(of: trainingService.fees)
                self.enrolledServices.removeAll(where: { $0.id == service.id })
                self.setDescription()
                trainingService.printReceipt(type: .CANCELLATION, by: self)
            }
        } else {
            print("Service not found")
        }
    }
    
    func attendService(service: Service) {
        if let fitnessService = self.enrolledServices.first(where: { $0.id == service.id }) as? FitnessClassesService {
            
            fitnessService.numberOfSessionAttended += 1
            if(fitnessService.numberOfSessionAttended >= fitnessService.numberOfTotalSessions) {
                fitnessService.numberOfSessionAttended = 0
                self.enrolledServices.removeAll(where: { $0.id == fitnessService.id })
                print("Congratulations! You have completed the fitness Service")
                print("Please consider joining again!")
            } else {
                print("\(self.name) attended \(fitnessService.numberOfSessionAttended) sessions of \(fitnessService.name)!")
                print("Total number of sessions to attend: \(fitnessService.numberOfTotalSessions)!")
            }
            
        } else if let trainingService = self.enrolledServices.first(where: { $0.id == service.id }) as? PersonalTrainingService {
            
            trainingService.isTrainingstart = true
            trainingService.numberOfTimesAttended += 1
            
            if (trainingService.numberOfTimesAttended == 1) {
                print("\(self.name) started \(trainingService.name) for \(self.name)!")
                print("\(self.name) attended \(trainingService.name) for \(trainingService.numberOfTimesAttended) times!")
                print("Total Times to attend: \(trainingService.totalTimesToAttend)!")
            } else if (trainingService.numberOfTimesAttended >= trainingService.totalTimesToAttend) {
                trainingService.isTrainingstart = false
                trainingService.numberOfTimesAttended = 0
                self.enrolledServices.removeAll(where: { $0.id == trainingService.id })
                print("Congratulations! You have completed the personal training Service")
                print("Please consider joining again!")
            } else {
                print("\(self.name) attended \(trainingService.name) for \(trainingService.numberOfTimesAttended) times!")
                print("Total Times to attend: \(trainingService.totalTimesToAttend)!")
            }
            
        } else {
            print("Service not found")
        }
    }
}
