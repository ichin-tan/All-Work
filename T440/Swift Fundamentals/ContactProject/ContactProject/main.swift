//
//  main.swift
//  ContactProject
//
//  Created by CP on 09/01/25.
//

//Chintan

import Foundation

var dict: [String: [String: String]] = [:]

func addContactt(name: String, phone: String, email: String) {
    dict[name] = ["phone": phone, "email": email]
}

func removeContactt(name: String) {
    dict.removeValue(forKey: name)
}

func getContactt(name: String) {
    for (key, val) in dict {
        if name == key {
            if let phone = val["phone"] {
                print(phone)
            } else {
                print("No contact found!!")
            }
            break
        }
    }
}

func readContactt() {
    for (key,val) in dict {
        print("name: \(key) -> phone: \(val["phone"]!) -> email: \(val["email"]!)")
    }
}

addContactt(name: "Chintan", phone: "9988776655", email: "c@gmail.com")
print(dict)
removeContactt(name: "Chintan")
print(dict)
addContactt(name: "John", phone: "9988776655", email: "j@gmail.com")
print(dict)
getContactt(name: "John")
readContactt()



//var arrContact :[[String: [String: String]]] = []
//
//func addContact(name: String, phone: String, email: String) {
//    var dictToAdd = ["\(name)" : ["phone":phone, "email": email]]
//    arrContact.append(dictToAdd)
//}
//
//func removeDic(name: String) {
//    for (index,item) in arrContact.enumerated() {
//        if(item.keys.first == name) {
//            arrContact.remove(at: index)
//        }
//    }
//}
//
//func getContacts(name: String) {
//    var contact : [String: [String: String]] = [:]
//    for item in arrContact {
//        print(item)
//        if(item.keys.first == name) {
//            contact = item
//            let innerDict = contact[name]!
//            if let phone = innerDict["phone"] {
//                print(phone)
//            } else {
//                print("No key for phone found")
//            }
//        } else {
//            print("No contact found")
//        }
//    }
//}
//
//func listContact() {
//    for item in arrContact {
//        print("\(item.keys.first!) -> phone : \(item[item.keys.first!]!["phone"]!) -> email : \(item[item.keys.first!]!["email"]!)")
//    }
//}
//
//addContact(name: "Chintan", phone: "9988776655", email: "c@gmail.com")
//print(arrContact)
//removeDic(name: "Chintan")
//print(arrContact)
//addContact(name: "John", phone: "9988776655", email: "j@gmail.com")
//print(arrContact)
//getContacts(name: "Chintan")
//listContact()
