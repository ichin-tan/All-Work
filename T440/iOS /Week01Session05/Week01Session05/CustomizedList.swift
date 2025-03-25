//
//  CustomizedList.swift
//  Week01Session05
//
//  Created by Chintan Patel on 2025-01-31.
//

import SwiftUI

struct CustomizedList: View {
    
    @State private var hyperCars = Car.hyperCarList()
    @State private var dailyDrivers = Car.dailyDriver()
    
    var body: some View {
        VStack {
            NavigationView {
                List {
                    // Hyper Car Section
                    Section {
                        DisclosureGroup("Hyper Cars") {
                            ForEach (hyperCars) { car in
                                CarListItem(car: car)
                            }
                            .onMove{ source, destination in
                                hyperCars.move(fromOffsets: source, toOffset: destination)
                            }
                            .onDelete(perform: { indexSet in
                                hyperCars.remove(atOffsets: indexSet)
                            })
                            //.listRowSeparator(.hidden)
                            //.listRowSeparatorTint(Color.orange)
                            .listRowBackground(
                                Capsule()
                                    .fill(Color(white: 1, opacity: 0.6))
                                    .padding(3)
                            )
                        }
                        .listRowBackground(
                            Capsule()
                                .fill(Color(white: 1, opacity: 0.6))
                                .padding(3)
                        )
                    } header: {
                        Text("Hyper Cars")
                            .font(.subheadline)
                            .bold()
                            .foregroundStyle(.white)
                            .textCase(.lowercase)
                    } footer: {
                        Text("These cars can go over 400kmph")
                            .foregroundStyle(.white)
                    }
                    .headerProminence(.increased)
                    .listSectionSeparatorTint(Color.red)
                    
                    // Daily Driver Section
                    Section {
                        ForEach (dailyDrivers) { car in
                            CarListItem(car: car)
                        }
                        .onMove{ source, destination in
                            dailyDrivers.move(fromOffsets: source, toOffset: destination)
                        }
                        .onDelete(perform: { indexSet in
                            dailyDrivers.remove(atOffsets: indexSet)
                        })
                        .listRowInsets(.none)
                        .listRowBackground(
                            Capsule()
                                .fill(Color(white: 1, opacity: 0.6))
                                .padding(3)
                        )
                    } header: {
                        Text("Daily Drivers")
                            .foregroundStyle(.white)
                    } footer: {
                        Text("These cars are daily beaters")
                            .foregroundStyle(.white)
                    }
                    .headerProminence(.increased)
                    
                    // Button to add new car to Daily Driver list
                    Button {
                        let newCar = Car(model: "New Daily Driver", make: "CarMake", speed: "180kmph", isFavorite: false)
                        
                        withAnimation {
                            dailyDrivers.append(newCar)
                        }
                    } label: {
                        Label("Add", systemImage: "plus")
                    }
                    .listRowBackground(
                        Capsule()
                            .fill(Color(white: 1, opacity: 0.6))
                            .padding(3)
                    )
                } // List End
                //.listStyle(.inset)
                .environment(\.defaultMinListRowHeight, 50)
                .scrollContentBackground(.hidden)
                //.background(Color.indigo)
                .background(
                    Image("car_image_1")
                        .edgesIgnoringSafeArea(.all)
                        .blur(radius: 3)
                        .overlay(Color.indigo.opacity(0.4))
                )
                .navigationBarItems(trailing: EditButton())
            }
        }
    }
}

#Preview {
    CustomizedList()
}
