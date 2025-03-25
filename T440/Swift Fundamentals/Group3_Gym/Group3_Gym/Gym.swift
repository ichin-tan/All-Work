//
//  Gym.swift
//  Group3_Gym
//
//  Created by CP on 21/01/25.
//

import Foundation

class Gym {
    var name: String = "Random Gym"
    var services: [Service] = []
    var members: [Memeber] = []
    var currentMember: Memeber?
    
    init() {
        let service1: FitnessClassesService = FitnessClassesService(name: "Fitness Class Service", fees: 20.0, trainerName: "John Johnson", durationOfClassInHour: 2)

        let service2: PersonalTrainingService = PersonalTrainingService(name: "Personal Training Service", fees: 50.0, trainerName: "Dave Dawson", sessionTime: "8:00 AM")
        
        self.services = [service1,service2]
    }
        
    func search() {
        print("Enter the Keyword to search ---- ")
        let keyword: String = readLine()?.lowercased() ?? ""
        
        var searchedServices: [Service] = []
        for service in self.services {
            if(service.name.lowercased().contains(keyword)) {
                searchedServices.append(service)
            } else if(service.fees == Double(keyword)) {
                searchedServices.append(service)
            } else if(((service as? PersonalTrainingService)?.trainerName ?? "").lowercased().contains(keyword)) {
                searchedServices.append(service)
            } else if(((service as? FitnessClassesService)?.trainerName ?? "").lowercased().contains(keyword)) {
                searchedServices.append(service)
            }
        }
        print(searchedServices)
    }
    
    func addPersonalTrainingService() {
        print("Enter Name of Service ---- ")
        let name: String = readLine()?.capitalized ?? ""
        if (name == "") {
            print("Name Can not be Empty! Try Again")
            return
        }
        
        print("Enter Fees of Service ---- ")
        let fees: Double = Double(readLine() ?? "") ?? 0.0
        if (fees == 0.0) {
            print("Fees Can not be Zero! Try Again")
            return
        }
        
        print("Enter Name of Trainer ---- ")
        let trainerName: String = readLine()?.capitalized ?? ""
        if (trainerName == "") {
            print("Trainer Name Can not be Empty! Try Again")
            return
        }

        print("Enter Time of Session(hh:m AM/PM) ---- ")
        let sessionTime: String = readLine()?.capitalized ?? ""
        if (sessionTime == "") {
            print("Session Time Can not be Empty! Try Again")
            return
        } else if (!sessionTime.isValidTime()) {
            print("Invalid Session Time. It should be in (hh:m AM/PM) Format! Try Again!")
            return
        }
        
        let service = PersonalTrainingService(name: name, fees: fees, trainerName: trainerName, sessionTime: sessionTime)
        self.services.append(service)
        print("\(service.name) is Added Successfully!")
    }
    
    func addFitnessClassService() {
        print("Enter Name of Service ---- ")
        let name: String = readLine()?.capitalized ?? ""
        if (name == "") {
            print("Name Can not be Empty! Try Again")
            return
        }
        
        print("Enter Fees of Service ---- ")
        let fees: Double = Double(readLine() ?? "") ?? 0.0
        if (fees == 0.0) {
            print("Fees Can not be Zero! Try Again")
            return
        }

        print("Enter Name of Trainer ---- ")
        let trainerName: String = readLine()?.capitalized ?? ""
        if (trainerName == "") {
            print("Trainer Name Can not be Empty! Try Again")
            return
        }

        print("Enter duration of Class (In hours) ---- ")
        let duration: Float = Float(readLine() ?? "") ?? 0.0
        if (duration == 0) {
            print("Duration Can not be Zero! Try Again")
            return
        }
        
        let service = FitnessClassesService(name: name, fees: fees, trainerName: trainerName, durationOfClassInHour: duration)
        self.services.append(service)
        print("\(service.name) is Added Successfully!")
    }
    
    func initialEnroll() -> Memeber? {
        print("Enter Your Name ---- ")
        let name = readLine() ?? ""
        print("Enter Your Email ---- ")
        let email = readLine() ?? ""
        print("Enter Your Age ---- ")
        let age = Int(readLine() ?? "") ?? 0
        print("Select your gender M/F ----")
        let gender = readLine()?.lowercased() ?? ""
        print("Select from these services ----")
        let service = self.showAllServicesAndGetSelectedService()
        
        if(name.isEmpty) {
            print("Name Cannot be empty!")
            return nil
        } else if (email.isEmpty) {
            print("Email Cannot be empty!")
            return nil
        } else if (age < 15) {
            print("You have to be at least 15 to enroll in the gym!")
            return nil
        } else if (gender != "M".lowercased() && gender != "F".lowercased()) {
            print("Invalid gender!")
            return nil
        } else if (service == nil) {
            print("Invalid service selected!")
            return nil
        } else {
            if(self.members.contains(where: { $0.email == email })) {
                print("You are already enrolled in gym!")
                return nil
            } else {
               
                // Because of this code I got the error of enrolling service with higher fees than member's credit
//                let member = Memeber(id: memberUniqueId, name: name, email: email, age: age, gender: gender.lowercased(), account: Account(accountHolderId: memberUniqueId), enrolledServices: [service!])

                // This is where I fixed it

                let memberUniqueId = UUID().uuidString
                let member = Memeber(id: memberUniqueId, name: name, email: email, age: age, gender: gender.lowercased(), account: Account(accountHolderId: memberUniqueId))
                self.currentMember = member
                if (member.account.creditPoints >= service!.fees) {
                    member.account.creditPoints -= service!.fees
                    member.account.setDescription()
                    member.setDescription()
                    service?.printReceipt(type: .BOOKING, by: member)
                } else {
                    print("Not enough funds to book this service!")
                }
                return member
            }
        }
    }
    
    func isAuthenticatedMember() -> Bool {
        print("Enter Your Email ---- ")
        let email = readLine() ?? ""
        if (self.members.contains(where: { $0.email == email })) {
            self.currentMember = self.members.first(where: { $0.email == email })
            return true
        }
        return false
    }
    
    private func showAllServicesAndGetSelectedService() -> Service? {
        self.showAllServices()
        let option = Int(readLine() ?? "") ?? 1
        if (option == 0 || option > services.count) {
            return nil
        }
        
        return self.services[option - 1]
    }
        
    func showAllServices() {
        print("SHOWING ALL SERVICES")
        var count = 0
        for service in self.services {
            count += 1
            print("\(count)\n\(service)")
        }
        if (count == 0) {
            print("No services available!")
        }
    }
    
    func showAllMembers() {
        print("SHOWING ALL MEMBERS")
        var count = 0
        for member in self.members {
            count += 1
            print("\(count)\n\(member)")
        }
        if (count == 0) {
            print("No members are enrolled in the gym!")
        }
    }
    
    func bookService() {
        print("Booking the service ----- ")
        if let member = self.currentMember {
            print("Select from these services ----")
            if let service = self.showAllServicesAndGetSelectedService() {
                if(member.enrolledServices.contains(where: {$0.id == service.id})) {
                    print("You already have this service!")
                } else {
                    if(member.account.creditPoints < service.fees) {
                        print("Sorry! Not enough funds!")
                    } else {
                        member.bookService(service: service)
                    }
                }
            } else {
                print("Invalid option selected! Please try again!")
            }
        } else {
            print("Not Authenticated! Please Join Again!")
        }
    }
    
    func cancelService() {
        print("Cancelling the service ----- ")
        if let member = self.currentMember {
            print("Select from these services ----")
            if let service = self.showAllServicesAndGetSelectedService() {
                if(member.enrolledServices.contains(where: {$0.id == service.id})) {
                    member.cancelService(service: service)
                } else {
                    print("You are not enrolled in this service so you cannot cancel!!")
                }
            } else {
                print("Invalid option selected! Please try again!")
            }
        } else {
            print("Not Authenticated! Please Join Again!")
        }
    }
    
    func attendService() {
        print("Attending Service ---- ")
        if let member = self.currentMember {
            print("Select from these services ----")
            if let service = self.showAllServicesAndGetSelectedService() {
                if(member.enrolledServices.contains(where: {$0.id == service.id})) {
                    member.attendService(service: service)
                } else {
                    print("You are not enrolled in this service so you cannot attend!!")
                }
            } else {
                print("Invalid option selected! Please try again!")
            }
        } else {
            print("Not Authenticated! Please Join Again!")
        }
    }
    
    func seeMemberAccount() {
        print("Seeing account ---- ")
        if let member = self.currentMember {
            member.seeAccount()
        } else {
            print("Not Authenticated! Please Join Again!")
        }
    }
    
    func loadFundsForMember() {
        if let member = self.currentMember {
            member.loadFundsInAccount()
        } else {
            print("Not Authenticated! Please Join Again!")
        }
    }
}
