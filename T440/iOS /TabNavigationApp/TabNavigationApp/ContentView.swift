//
//  ContentView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var petStore = PetStoreModel() // @stateobject indicates ownership that means this content view is the view where this petStore is created
    
    var body: some View {
        TabView {
            PetListView()
                .tabItem {
                    Label("List", systemImage: "list.bullet")
                }
            PetDataEntryView()
                .tabItem {
                    Label("Add", systemImage: "plus")
                }
            PetSummaryView()
                .tabItem {
                    Label("Summary", systemImage: "pencil.and.outline")
                }
        }
        .environmentObject(self.petStore)
        .onAppear() {
            self.petStore.pets.append(PetModel(name: "A", type: "Four", age: 1))
            self.petStore.pets.append(PetModel(name: "B", type: "Four", age: 10))
            self.petStore.pets.append(PetModel(name: "C", type: "One", age: 2))
            self.petStore.pets.append(PetModel(name: "D", type: "One", age: 4))
            self.petStore.pets.append(PetModel(name: "E", type: "Five", age: 7))
            self.petStore.pets.append(PetModel(name: "F", type: "Two", age: 8))
            self.petStore.pets.append(PetModel(name: "G", type: "One", age: 3))
            self.petStore.pets.append(PetModel(name: "H", type: "Four", age: 5))
            self.petStore.pets.append(PetModel(name: "I", type: "Two", age: 9))
            
            print("Contentview Appeared")
        }
        .onDisappear() {
            print("Contentview DisAppeared")
        }
    }
}

#Preview {
    ContentView()
}
