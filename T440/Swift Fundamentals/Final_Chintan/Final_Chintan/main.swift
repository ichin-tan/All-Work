//
//  main.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

implementing(taskNumber: 1)

var rp1: Property? = ResidentialProperty(propertyID: 1, address: "Toronto", area: 1500, sellingPrice: 1000000, bedroomCount: 2, bathroomCount: 2, residentialPropertyType: .apartment)
var rp2: Property? = ResidentialProperty(propertyID: 2, address: "Downtown", area: 1200, sellingPrice: 800000, bedroomCount: 1, bathroomCount: 1, residentialPropertyType: .condo)
var rp3: Property? = ResidentialProperty(propertyID: 3, address: "Toronto", area: 2500, sellingPrice: 1100000, bedroomCount: 0, bathroomCount: 0, residentialPropertyType: .detached)

var cp1: Property? = CommercialProperty(propertyID: 4, address: "Vancouver", area: 1000, sellingPrice: 910000, shelveCount: 1, exitCount: 1, storeyCount: 2, commercialPropertyType: .coffeeShop)
var cp2: Property? = CommercialProperty(propertyID: 5, address: "Scarborough", area: 1200, sellingPrice: 750000, shelveCount: 2, exitCount: 2, storeyCount: 3, commercialPropertyType: .store)
var cp3: Property? = CommercialProperty(propertyID: 6, address: "", area: 0, sellingPrice: 0, shelveCount: 2, exitCount: 2, storeyCount: 3, commercialPropertyType: .store)


implementing(taskNumber: 2)

var agent1 = Agent(agentID: 1, name: "John", email: "john@gmail.com")
var agent2 = Agent(agentID: 2, name: "Adam", email: "adam@gmail.com")
var agent3 = Agent(agentID: 3, name: "Jason", email: "jason@gmail.com")

implementing(taskNumber: 3)

var manager = Manager()

manager.addProperty(property: rp1)
manager.addProperty(property: rp2)
manager.addProperty(property: rp3)
manager.addProperty(property: cp1)
manager.addProperty(property: cp2)
manager.addProperty(property: cp3)

manager.addAgent(agent: agent1)
manager.addAgent(agent: agent2)
manager.addAgent(agent: agent3)

implementing(taskNumber: 4)

manager.assignAgentToProperty(agent: agent1, propertyID: rp1?.propertyID ?? 0)
manager.assignAgentToProperty(agent: agent2, propertyID: cp1?.propertyID ?? 0)
manager.assignAgentToProperty(agent: agent3, propertyID: rp2?.propertyID ?? 0)
manager.assignAgentToProperty(agent: agent1, propertyID: cp2?.propertyID ?? 0)
manager.assignAgentToProperty(agent: agent2, propertyID: rp3?.propertyID ?? 0)
manager.assignAgentToProperty(agent: agent3, propertyID: cp3?.propertyID ?? 0)

implementing(taskNumber: 5)

manager.showAllPropertiesSortedBySellingPrice()

implementing(taskNumber: 6)

manager.updateProperty(propertyID: rp1?.propertyID ?? 0, newPrice: 1200000)

manager.showAllPropertiesSortedBySellingPrice()

implementing(taskNumber: 7)

manager.removeProperty(propertyToDelete: &rp1)

manager.showAllPropertiesSortedBySellingPrice()

implementing(taskNumber: 8)

var searchedProperties1 = manager.searchProperties(type: .commercial, address: "Toronto", maximumPrice: 100000)
print("Serached Properties 1")
searchedProperties1.forEach({ print("\n\($0.description)\n") })

var searchedProperties2 = manager.searchProperties(type: .residential, address: "", maximumPrice: 850000)
print("Serached Properties 2")
searchedProperties2.forEach({ print("\n\($0.description)\n") })

var searchedProperties3 = manager.searchProperties(type: .commercial, address: "Vancouver", maximumPrice: 0)
print("Serached Properties 3")
searchedProperties3.forEach({ print("\n\($0.description)\n") })

var searchedProperties4 = manager.searchProperties(type: .commercial, address: "", maximumPrice: 0)
print("Serached Properties 4")
searchedProperties4.forEach({ print("\n\($0.description)\n") })

var searchedProperties5 = manager.searchProperties(type: .residential, address: "", maximumPrice: 0)
print("Serached Properties 5")
searchedProperties5.forEach({ print("\n\($0.description)\n") })

implementing(taskNumber: 9)

do {
    try agent1.sellProperty(property: rp1)
} catch (let error) {
    print(error)
}

do {
    try agent3.sellProperty(property: cp1)
} catch (let error) {
    print(error)
}

do {
    try agent1.sellProperty(property: cp2)
} catch (let error) {
    print(error)
}

implementing(taskNumber: 10)

do {
    try agent2.buyProperty(property: rp1)
} catch (let error) {
    print(error)
}

do {
    try agent3.buyProperty(property: rp2)
} catch (let error) {
    print(error)
}

implementing(taskNumber: 11)

do {
    try agent2.buyProperty(property: cp2)
} catch (let error) {
    print(error)
}

implementing(taskNumber: 12)

manager.displayHighestEarningAgent()

func implementing(taskNumber: Int) {
    print("\n------- Implementing Task \(taskNumber) -------\n")
}

