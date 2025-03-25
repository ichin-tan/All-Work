//
//  CarListItem.swift
//  Week01Session05
//
//  Created by Chintan Patel on 2025-01-31.
//

import SwiftUI

struct CarListItem: View {
    
    let car: Car
    
    var body: some View {
        HStack {
            Text("🚗")
            Text(car.model)
            Spacer()
            Image(systemName: car.isFavorite ? "star.fill" : "star")
        }
        .onTapGesture {
            print("Car Selected: \(car.model)")
        }
    }
}
