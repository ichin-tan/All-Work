//
//  OrangeScreenView.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//

import SwiftUI

struct OrangeScreenView: View {
    var body: some View {
        VStack {
            Text("Orange Screen")
                .font(.headline)
                .foregroundColor(.orange)
        }
        .padding()
        .frame(maxWidth: .infinity)
        .background(Color.black)
    }
}

#Preview {
    OrangeScreenView()
}
