//
//  ShareView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct ShareView: View {
    var body: some View {
        VStack {
            Text("Share View")
                .font(.headline)
            
            ShareLink(item: URL(string: "https://www.google.com")!) {
                Text("Visit our website")
            }
            
            ShareLink(item: "Check this place out") {
                Text("Share with a friend")
                    .font(.headline)
            }

            let message = "Look what I found"
            let url = "https://www.apple.com"
            
            ShareLink(items: [message, url]) {
                Text("Share text and url")
                    .font(.headline)
            }
        }
        .navigationTitle(Text("Share"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    ShareView()
}
