//
//  PlantListView.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import SwiftUI

struct PlantListView: View {
    @State private var plants: [Plant] = []
    
    var indoorPlants: [Plant] {
        plants.filter { $0.type == "Indoor" }
    }
    
    var outdoorPlants: [Plant] {
        plants.filter { $0.type == "Outdoor" }
    }
    
    var body: some View {
        NavigationView {
            
            VStack {
                
                Text("Plant List")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(greenColor)
                
                List {
                    
                    if (indoorPlants.count != 0) {
                        Section(header: Text("Indoor Plants").font(.headline)) {
                            ForEach(indoorPlants) { plant in
                                NavigationLink(destination: PlantDetailView(plant: plant, onSave: { updatedPlant in
                                    FirebaseManager.shared.savePlant(updatedPlant)
                                    fetchPlants()
                                })) {
                                    Text("\(plant.name)")
                                }
                            }
                            .onDelete { indexSet in
                                deletePlants(at: indexSet, from: indoorPlants)
                            }
                        }
                    }
                    
                    if (outdoorPlants.count != 0) {
                        Section(header: Text("Outdoor Plants").font(.headline)) {
                            ForEach(outdoorPlants) { plant in
                                NavigationLink(destination: PlantDetailView(plant: plant, onSave: { updatedPlant in
                                    FirebaseManager.shared.savePlant(updatedPlant)
                                    Task {
                                        FirebaseManager.shared.savePlant(updatedPlant)
                                        fetchPlants()
                                    }
                                })) {
                                    Text("\(plant.name)")
                                }
                            }
                            .onDelete { indexSet in
                                deletePlants(at: indexSet, from: outdoorPlants)
                            }
                        }
                    }
                }
                .cornerRadius(10)
            }
            .onAppear() {
                fetchPlants()
            }
            .background(backgroundColor)
        }
        .padding()
        .background(backgroundColor)
    }
    
    private func fetchPlants() {
        
        FirebaseManager.shared.fetchPlants { firebasePlants in
            plants = firebasePlants
        }
    }
    
    private func deletePlants(at offsets: IndexSet, from plantList: [Plant]) {
        for index in offsets {
            let plant = plantList[index]
            FirebaseManager.shared.deletePlant(id: plant.id ?? "")
        }
        fetchPlants()
    }
}
