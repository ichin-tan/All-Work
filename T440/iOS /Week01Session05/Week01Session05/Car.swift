//
//  Car.swift
//  Week01Session05
//
//  Created by Chintan Patel on 2025-01-31.
//

import Foundation

struct Car: Identifiable, Hashable {
    let id = UUID()
    var model: String
    var make: String
    var speed: String
    var isFavorite: Bool
    
    static func preview() -> [Car] {
        return [
            Car(model: "Chiron Super Sport", make: "Buggati", speed: "441kmph", isFavorite: true),
            Car(model: "McLaren 750s", make: "McLaren", speed: "320kmph", isFavorite: false),
            Car(model: "Pagani Huayra BC", make: "Pagani", speed: "380kmph", isFavorite: false),
            Car(model: "Super Deluxe Slow", make: "Toyota", speed: "320kmph", isFavorite: true),
            Car(model: "Jesko", make: "Konigsegg", speed: "390kmph", isFavorite: false),
            Car(model: "Aventdor LP700", make: "Lamborghini", speed: "320kmph", isFavorite: true),
            Car(model: "Ferrari SF90", make: "Ferrari", speed: "360kmph", isFavorite: false),
            Car(model: "McLaren Senna", make: "McLaren", speed: "340kmph", isFavorite: true),
            Car(model: "Valhalla", make: "Aston Martin", speed: "341kmph", isFavorite: false)
        ]
    }
    
    static func hyperCarList() -> [Car] {
        return [
            Car(model: "Chiron Super Sport", make: "Buggati", speed: "441kmph", isFavorite: true),
            Car(model: "Pagani Huayra BC", make: "Pagani", speed: "380kmph", isFavorite: false),
            Car(model: "Super Deluxe Slow", make: "Toyota", speed: "320kmph", isFavorite: true),
            Car(model: "Jesko", make: "Konigsegg", speed: "390kmph", isFavorite: false),
            Car(model: "Ferrari Monza SP2", make: "Ferrari", speed: "341kmph", isFavorite: false),
            Car(model: "McLaren Senna", make: "McLaren", speed: "340kmph", isFavorite: true),
            Car(model: "Valhalla", make: "Aston Martin", speed: "341kmph", isFavorite: false),
            Car(model: "Pagani Zonda R", make: "Pagani", speed: "380kmph", isFavorite: false),
        ]
    }
    
    static func dailyDriver() -> [Car] {
        return [
            Car(model: "Super Deluxe", make: "Toyota", speed: "240kmph", isFavorite: true),
            Car(model: "2000 GT", make: "Toyota", speed: "200kmph", isFavorite: false),
            Car(model: "Mazda 3", make: "Mazda", speed: "220kmph", isFavorite: false),
            Car(model: "GLC 300", make: "Mercedes Benz", speed: "240kmph", isFavorite: true),
            Car(model: "Civic", make: "Honda", speed: "220kmph", isFavorite: false)
        ]
    }
}
