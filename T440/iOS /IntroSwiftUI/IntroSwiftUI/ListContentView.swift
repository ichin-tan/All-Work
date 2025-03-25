//
//  ListContentView.swift
//  IntroSwiftUI
//
//  Created by CP on 30/01/25.
//

// Session 4 - Prof Chintan

import SwiftUI

struct Pet: Identifiable, Hashable {
    var name: String
    var id = UUID()
}

//Basic List
struct ListContentView: View {
    
    @State private var pets: [Pet] = [
        Pet(name: "Tom"),
        Pet(name: "Jerry"),
        Pet(name: "Oscar"),
        Pet(name: "Tiger"),
        Pet(name: "Jade")
    ]
    
    var body: some View {
        
//        List(pets) { pet in
//            PetListItem(pet: pet)
//        }
//        .listStyle(InsetGroupedListStyle())
//        .navigationBarTitle("Pets")
        
        NavigationView {
            List {
                ForEach(self.pets, id: \.self) { pet in
                    PetListItem(pet: pet)
                }
                .onMove(perform: { source, destination in
                    self.pets.move(fromOffsets: source, toOffset: destination)
                })
                .onDelete { offset in
                    pets.remove(atOffsets: offset)
                }
            }
            .listStyle(InsetListStyle())
            .navigationTitle("Pets")
            .navigationBarItems(trailing: EditButton())
        }
    }
}

#Preview {
    ListContentView()
}
