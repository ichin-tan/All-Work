//
//  TomatoScreenView.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct TomatoScreenView: View {
    
    // If i wanna change any property of user info, i need to mark it as @environmentObject. EnvironmentObject means it's reference will be affected accross all the files
    @EnvironmentObject var userInfo: User
    
    var body: some View {
        VStack {
            Text("Tomato Screen")
                .font(.headline)
                .foregroundColor(.red)
            
            Text(userInfo.description)
                .font(.headline)
                .foregroundColor(.red)
            
            Text(userInfo.favFruit)
                .font(.headline)
                .foregroundColor(.red)
            
            Button {
                self.userInfo.favFruit = "Grape"
            } label: {
                Text("Change to grape")
                    .font(.headline)
                    .fontWeight(.bold)
            }
            .buttonStyle(.borderedProminent)

        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.black)
    }
}

#Preview {
    TomatoScreenView()
}
