//
//  main.swift
//  Group3_Gym
//
//  Created by CP on 21/01/25.
//

import Foundation

print("Starting the program")

var gym = Gym()
showMainMenu()

// Making Menu

func showMainMenu() {
    deinitializeCurrentMember()
    print("========== \(gym.name) Main Menu ==========")
    print("In which portal you want to go?")
    print("1. Gym Owner")
    print("2. General User")
    print("3: Exit")
    let option: Int = Int(readLine() ?? "") ?? 0

    switch(option) {
        case 1:
            showOwnerMenu()
        case 2:
            showGeneralUserMenu()
        case 3:
            exit(1)
        default:
            print("Invalid option!!")
            showMainMenu()
        }
}

func showOwnerMenu() {
    deinitializeCurrentMember()
    print("========== \(gym.name) Owner Menu ==========")
    print("1. Show all services")
    print("2. Search Services")
    print("3. Add new service")
    print("4. Show all members")
    print("5. Go Back to Main Menu")
    
    let option: Int = Int(readLine() ?? "") ?? 0

    switch(option) {
        case 1:
            gym.showAllServices()
            showOwnerMenu()
        case 2:
            print("Starting Search.......\n")
            gym.search()
            showOwnerMenu()
        case 3:
            showServiceOptions()
        case 4:
            gym.showAllMembers()
            showOwnerMenu()
        case 5:
            showMainMenu()
        default:
            print("Invalid option!!")
            showOwnerMenu()
        }
}

func showGeneralUserMenu() {
    deinitializeCurrentMember()
    print("========== \(gym.name) General User Menu ==========")
    print("1. Show all services")
    print("2. Search Services")
    print("3. Join Gym")
    print("4. Already a member?")
    print("5. Go Back to Main Menu")
    
    let option: Int = Int(readLine() ?? "") ?? 0

    switch(option) {
        case 1:
            gym.showAllServices()
            showGeneralUserMenu()
        case 2:
            print("Starting Search.......\n")
            gym.search()
            showGeneralUserMenu()
        case 3:
            print("Enrolling")
            if let member = gym.initialEnroll() {
                gym.members.append(member)
                print("Successfully Enrolled")
                showMemberMenu()
            } else {
                print("Couldn't make member! Please try again!")
                showGeneralUserMenu()
            }
        case 4:
            if(gym.isAuthenticatedMember()) {
                print("Authenticated! Welcome to \(gym.name)!")
                showMemberMenu()
            } else {
                print("Email not found! Please enroll again!")
                showGeneralUserMenu()
            }
        case 5:
            showMainMenu()
        default:
            print("Invalid option!!")
            showGeneralUserMenu()
        }
}

func showMemberMenu() {
    print("========== \(gym.name) Member Menu ==========")
    print("1. Show all services")
    print("2. Search Services")
    print("3. Book A Service")
    print("4. Attend A Service")
    print("5. Cancel A Service")
    print("6. See My Account")
    print("7. Load Funds")
    print("8. Go Back to Main Menu")
    
    let option: Int = Int(readLine() ?? "") ?? 0

    switch(option) {
        case 1:
            gym.showAllServices()
            showMemberMenu()
        case 2:
            print("Starting Search.......\n")
            gym.search()
            showMemberMenu()
        case 3:
            gym.bookService()
            showMemberMenu()
        case 4:
            gym.attendService()
            showMemberMenu()
        case 5:
            gym.cancelService()
            showMemberMenu()
        case 6:
            gym.seeMemberAccount()
            showMemberMenu()
        case 7:
            gym.loadFundsForMember()
            showMemberMenu()
        case 8:
            showMainMenu()
        default:
            print("Invalid option!!")
            showMemberMenu()
        }

}

func showServiceOptions() {
    deinitializeCurrentMember()
    print("========== \(gym.name) Service Options ==========")
    print("1. Personal Training Service")
    print("2. Fitness Class Service")
    print("3. Go Back to Owner Menu")
    
    let option: Int = Int(readLine() ?? "") ?? 0

    switch(option) {
        case 1:
            gym.addPersonalTrainingService()
            showOwnerMenu()
        case 2:
            gym.addFitnessClassService()
            showOwnerMenu()
        case 3:
            showOwnerMenu()
        default:
            print("Invalid option!!")
            showMainMenu()
        }
}

func deinitializeCurrentMember() {
    if(gym.currentMember != nil) {
        gym.currentMember = nil
    }
}
