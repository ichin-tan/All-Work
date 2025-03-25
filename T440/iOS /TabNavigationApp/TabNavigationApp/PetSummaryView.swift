//
//  PetSummaryView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct PetSummaryView: View {
    
    @EnvironmentObject var petStore: PetStoreModel
    
    var body: some View {
        
        NavigationStack {
            
            VStack {
                let dict = Dictionary(grouping: petStore.pets, by: { $0.type })
                
                ForEach(dict.keys.sorted(), id: \.self) { type in
                    
                    Text("\(type): \(dict[type]?.count ?? 0)")
                        .font(.title)
                }
            }
            .navigationTitle("Summary")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
//                    Button("Add") {
//                        
//                    }.buttonStyle(.borderedProminent)

                    Menu {
                        
                        NavigationLink(destination: SettingsView()) {
                            Label("Setting", systemImage: "gear")
                        }
                        
                        NavigationLink(destination: ProfileView()) {
                            Label("Profile", systemImage: "person.circle")
                        }
                        
                        NavigationLink(destination: ShareView()) {
                            Label("Share", systemImage: "square.and.arrow.up")
                        }
                    } label: {
                        Label("Option", systemImage: "ellipsis.circle")
                    }
                }
            }

        }
    }
}

#Preview {
    PetSummaryView()
}
