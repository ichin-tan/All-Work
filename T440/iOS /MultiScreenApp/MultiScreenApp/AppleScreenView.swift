//
//  AppleScreenView.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct AppleScreenView: View {
    
    var message: String = "NA"
    
    var body: some View {
        VStack {
            Text("Apple Screen")
                .font(.headline)
                .foregroundColor(.red)
            
            Text("Message: \(message)")
                .font(.headline)
                .foregroundColor(.red)

            Spacer()
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.black)
        .navigationTitle("Apple Screen")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    AppleScreenView()
}
