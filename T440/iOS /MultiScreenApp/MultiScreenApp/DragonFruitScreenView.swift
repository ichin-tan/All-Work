//
//  DragonFruitScreenView.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct DragonFruitScreenView: View {
    
    @ObservedObject var user: User
    
    var body: some View {
        VStack {
            Text("Dragon Fruit Screen")
                .font(.headline)
                .foregroundColor(.orange)
            
            Text("favFruit : \(user.favFruit)")
                .font(.largeTitle)
                .foregroundColor(.orange)

        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.black)
    }
}
