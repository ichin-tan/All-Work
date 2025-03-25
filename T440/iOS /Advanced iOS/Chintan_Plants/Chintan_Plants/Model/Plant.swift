//
//  Plant.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import Foundation
import FirebaseFirestore

struct Plant: Identifiable, Codable {
    @DocumentID var id: String? = UUID().uuidString
    var name: String
    var type: String
    var size: String
    var quantity: Int
    var location: PlantLocation
}
