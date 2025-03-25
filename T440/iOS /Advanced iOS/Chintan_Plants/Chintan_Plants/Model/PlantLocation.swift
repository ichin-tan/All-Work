//
//  PlantLocation.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import Foundation
import CoreLocation

struct PlantLocation: Codable {
    let latitude: Double
    let longitude: Double
    
    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }
}
