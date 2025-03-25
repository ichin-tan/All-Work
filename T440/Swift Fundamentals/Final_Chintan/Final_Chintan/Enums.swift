//
//  Enums.swift
//  Final_Chintan
//
//  Created by CP on 22/01/25.
//

import Foundation

enum PropertyType: String {
    case residential, commercial
}

enum ResidentialPropertyType {
    case condo, apartment, detached, semiDetached
}

enum CommercialPropertyType {
    case warehouse, store, coffeeShop
}

enum AgentError: Error {
    case buyError(String)
    case sellError(String)
}
