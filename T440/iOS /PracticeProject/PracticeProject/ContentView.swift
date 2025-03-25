//
//  ContentView.swift
//  PracticeProject
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct ContentView: View {
    
    @State private var count = 0
    @State private var name = ""
    
    var body: some View {
        
        Button("Count - \(count)") {
            count += 1
        }
        
        Button("\(name)") {
            name = "Changeeee"
        }
        
        TextField("Hello", text: $name)
            .onChange(of: name) { oldValue, newValue in
                print(oldValue, newValue)
            }
    }
}

#Preview {
    ContentView()
}
