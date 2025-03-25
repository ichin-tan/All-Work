//
//  Chintan_PlantsApp.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import SwiftUI
import Firebase

@main
struct Chintan_PlantsApp: App {
    
    init() {
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
