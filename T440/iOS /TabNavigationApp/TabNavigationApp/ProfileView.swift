//
//  ProfileView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct ProfileView: View {
    var body: some View {
        VStack {
            Text("Profile View")
                .font(.headline)
        }
        .navigationTitle(Text("Profile"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    ProfileView()
}
