//
//  PetListView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct PetListView: View {
    
    @EnvironmentObject var petStore: PetStoreModel
    
    var body: some View {
        
        NavigationStack {
            VStack {
                List(petStore.pets) { pet in
                    
                    NavigationLink(destination: PetDetailView(pet: pet)) {
                        Text(pet.name)
                            .font(.title)
                    }
                    
                }
            }
            .navigationTitle("Pet List")
            .navigationBarTitleDisplayMode(.inline)
        }
        
    }
}

#Preview {
    PetListView()
}
