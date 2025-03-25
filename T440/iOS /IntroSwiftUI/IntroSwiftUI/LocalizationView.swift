//
//  LocalizationView.swift
//  IntroSwiftUI
//
//  Created by CP on 30/01/25.
//

// Session 4 - Prof Chintan

import SwiftUI

struct LocalizationView: View {
    var body: some View {
        VStack {
            Text(LocalizedStringKey("Welcome to my application"))
                .font(.title)
            
            Button(LocalizedStringKey("Save")) {
                
            }
            .background(.blue)
            .foregroundColor(.white)
            
            Button(LocalizedStringKey("Cancel")) {
                
            }
            .background(.red)
            .foregroundColor(.white)
        }
        .padding()
    }
}

#Preview {
    LocalizationView()
}
