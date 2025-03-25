//
//  Session.swift
//  Group9_Nature
//
//  Created by CP on 12/02/25.
//

import Foundation

class Session: Identifiable {
    let id = UUID().uuidString
    let sessionId: Int
    let name: String
    let price: String
    let description: String
    let rating: Int
    let guideName: String
    var isFavorite: Bool = false
    let photos: [String]
    let guideNumber: String
    
    init(sessionId: Int, name: String, price: String, description: String, rating: Int, guideName: String, isFavorite: Bool, photos: [String], guideNumber: String) {
        self.sessionId = sessionId
        self.name = name
        self.price = price
        self.description = description
        self.rating = rating
        self.guideName = guideName
        self.isFavorite = isFavorite
        self.photos = photos
        self.guideNumber = guideNumber
    }
}
