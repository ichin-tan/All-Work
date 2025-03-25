//
//  CityListView.swift
//  IntroSwiftUI
//
//  Created by CP on 30/01/25.
//

import SwiftUI

struct City: Identifiable, Hashable {
    
    var name: String
    var description: String
    var id = UUID()

}

struct CityListView: View {
    
    @State private var cities : [City] = [
        City(name: "Toronto", description: "Toronto Description"),
        City(name: "Vancouver", description: "Vancouver Description"),
        City(name: "Ahmedabad", description: "Ahmedabad Description"),
        City(name: "Vadodara", description: "Vadodara Description"),
        City(name: "Surat", description: "Surat Description"),
        City(name: "Mumbai", description: "Mumbai Description"),
        City(name: "Kerala", description: "Kerala Description"),
        City(name: "Chennai", description: "Chennai Description"),
        City(name: "Kochi", description: "Kochi Description"),
        City(name: "Delhi", description: "Delhi Description")
    ]
    
    var body: some View {
        NavigationView {
            List {
                ForEach(self.cities, id: \.self) { city in
                    CityListItem(city: city)
                }
                .onMove(perform: { source, destination in
                    self.cities.move(fromOffsets: source, toOffset: destination)
                })
                .onDelete { offset in
                    cities.remove(atOffsets: offset)
                }
            }
            .listStyle(InsetListStyle())
            .navigationTitle("Cities")
            .navigationBarItems(trailing: EditButton())
        }
    }
}

#Preview {
    CityListView()
}
