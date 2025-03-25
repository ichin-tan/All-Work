//
//  PetModel.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import Foundation

class PetModel: ObservableObject, Identifiable {
    @Published var name: String = ""
    @Published var type: String = ""
    @Published var age: Int = 0
    
    init(name: String, type: String, age: Int) {
        self.name = name
        self.type = type
        self.age = age
    }
}

class PetStoreModel: ObservableObject {
    @Published var pets: [PetModel] = []
}

