//
//  SettingsView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct SettingsView: View {
    var body: some View {
        VStack {
            Text("Settings View")
                .font(.headline)
        }
        .navigationTitle(Text("Settings"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    SettingsView()
}
