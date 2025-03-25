//
//  PetListItem.swift
//  IntroSwiftUI
//
//  Created by CP on 30/01/25.
//

import SwiftUI

struct PetListItem: View {
    
    let pet: Pet
    
    var body: some View {
        HStack{
            Text(pet.name)
                .font(.headline)
                .foregroundColor(.primary)
            Spacer()
            Image(systemName: "pawprint")
                .imageScale(.large)
                .foregroundColor(.secondary)
        }
        .listRowBackground(Color.blue.opacity(0.1))
        .listRowInsets(EdgeInsets(top: 10, leading: 10, bottom: 10, trailing: 10))
    }
}
#Preview {
    PetListItem(pet: Pet(name: ""))
}






