//
//  ContentView.swift
//  IntroSwiftUI
//
//  Created by CP on 27/01/25.
//

// Session 1 - Prof Jigisha

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 50.0) {
            Image(systemName: "globe")
                .foregroundColor(Color.purple)
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Yes")
            Image(systemName: "person")
                .foregroundColor(.green)
                .imageScale(.large)
                .frame(width: 100, height: 100)
                .background(Color.gray)
                .border(.blue, width: 5.0)
        }
        .padding(.trailing, 250.0)
        .padding(.bottom, 400.0)
    }
}

#Preview {
    ContentView()
}
