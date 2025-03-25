//
//  Category.swift
//  FakeStoreApi
//
//  Created by CP on 06/03/25.
//

import Foundation

struct CategoryResponse: Codable {
    
    let arrCategories: [Category]
    
}

struct Category: Identifiable, Codable {
    
    var id = UUID().uuidString
    let name: String
    
}
