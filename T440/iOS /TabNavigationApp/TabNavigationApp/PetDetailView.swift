//
//  PetDetailView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct PetDetailView: View {
    
    let pet : PetModel
    
    var body: some View {
        
        VStack {
            
            Text(pet.name)
                .font(.title)
                .fontWeight(.bold)
            Text(pet.type)
            Text("\(pet.age)")
            
        }
        .navigationTitle("Pet Details")
        .navigationBarTitleDisplayMode(.inline)
                 
    }
}


