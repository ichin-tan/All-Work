//
//  ContentView.swift
//  6FebSwiftUI
//
//  Created by CP on 06/02/25.
//

// User default

import SwiftUI

struct ContentView: View {
    
    @State private var a = ""
    
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
            
            TextField("GGg", text: $a)
                .onSubmit {
                    print("Done")
                }
            
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
