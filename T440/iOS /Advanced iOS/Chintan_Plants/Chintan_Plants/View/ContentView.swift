//
//  ContentView.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import SwiftUI

struct ContentView: View {
    @State private var selection = 0
    
    var body: some View {
        TabView(selection: $selection) {
            PlantOrderView()
                .tabItem {
                    Image(systemName: "leaf")
                    Text("Order")
                }
                .tag(0)
            
            PlantListView()
                .tabItem {
                    Image(systemName: "list.bullet")
                    Text("Collection")
                }
                .tag(1)
        }
        .accentColor(.primary)
    }
}

#Preview {
    ContentView()
}
