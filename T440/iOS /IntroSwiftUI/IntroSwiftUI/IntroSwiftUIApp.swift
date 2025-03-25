//
//  IntroSwiftUIApp.swift
//  IntroSwiftUI
//
//  Created by CP on 27/01/25.
//

import SwiftUI

@available(iOS 17.0, *)
@main
struct IntroSwiftUIApp: App {
    
    // Refers to scenePhace environment variable to identify the app life cycle phase
    @Environment(\.scenePhase) var scenePhase
    
    var body: some Scene {
        WindowGroup {
            CityListView()
//            ListContentView()
//            LocalizationView()
//            GridExampleView()
//            HVZContentView()
//            ControlContentView()
            //                ContentView()
        }
        .onChange(of: scenePhase, initial: true, { oldValue, newValue in
            print("changed from \(oldValue) to \(newValue)")
        })
        //            .onChange(of: scenePhase) { changedScenePhase in
        //                print("Scene Phase is \(changedScenePhase)!")
        //
        // Inactive - initialize any resources
        // Background - save any resources
    }
}


// Split view for same app as well - scene
// some means scene can be changed - like if you have 2 scenes of email in splitview, both screen can be changed
// Windowgroup - container of screens

// A closure can capture constants and variables from the surrounding context in which it's defined. The closure can then refer to and modify the values of those constants and variables from within its body, even if the original scope that defined the constants and variables no longer exists.

