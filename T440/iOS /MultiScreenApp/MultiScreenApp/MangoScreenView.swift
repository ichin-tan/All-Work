//
//  MangoScreenView.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct MangoScreenView: View {
    
    var userInfo: User?
    
    var body: some View {
        VStack {
            Text("Mango Screen")
                .font(.headline)
                .foregroundColor(.yellow)
            
            Text(userInfo?.description ?? "No user found!")
                .font(.headline)
                .foregroundColor(.yellow)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.black)
    }
}

#Preview {
    MangoScreenView()
}
