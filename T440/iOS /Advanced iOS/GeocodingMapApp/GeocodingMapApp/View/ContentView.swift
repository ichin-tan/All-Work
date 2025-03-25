//
//  ContentView.swift
//  GeocodingMapApp
//
//  Created by CP on 04/03/25.
//

import SwiftUI

struct ContentView: View {
    
    @State private var selection = 0
    
    var body: some View {
        TabView(selection: $selection) {
            ForwardGeocodingView()
                .tabItem {
                    Image(systemName: "mappin.and.ellipse")
                    Text("Forward Geo")
                }
                .tag(0)
            
            BackwordGeocodingView()
                .tabItem {
                    Image(systemName: "location.circle.fill")
                    Text("Backword Geo")
                }
                .tag(1)
            
            
            MapView()
                .tabItem {
                    Image(systemName: "map.fill")
                    Text("Map")
                }
                .tag(2)
        }
        .onAppear {
            let appearance = UITabBarAppearance()
            appearance.configureWithOpaqueBackground()
            appearance.backgroundColor = .white
            
            appearance.stackedLayoutAppearance.normal.iconColor = .lightGray
            appearance.stackedLayoutAppearance.normal.titleTextAttributes = [.foregroundColor: UIColor.lightGray]
            
            appearance.stackedLayoutAppearance.selected.iconColor = .systemTeal
            appearance.stackedLayoutAppearance.selected.titleTextAttributes = [.foregroundColor: UIColor.systemTeal]
            UITabBar.appearance().standardAppearance = appearance
            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
}

#Preview {
    ContentView()
}
