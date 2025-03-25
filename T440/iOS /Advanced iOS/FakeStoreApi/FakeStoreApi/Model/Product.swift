//
//  Product.swift
//  FakeStoreApi
//
//  Created by CP on 06/03/25.
//

struct ProductResponse: Codable {
    
    let arrProducts: [Product]
    
}


struct Product: Identifiable, Codable {
    var id: Int
    var title: String
    var price: Double
    var description: String
    var category: String
    var image: String
}
