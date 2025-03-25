//
//  FavoriteListView.swift
//  Group9_Nature
//
//  Created by CP on 13/02/25.
//

import SwiftUI

struct FavoriteListView: View {
    
    @State private var arrFavSessions: [Session] = []
    
    var body: some View {
        VStack {
            List(self.arrFavSessions) { session in
                HStack {
                    Image(session.photos[0])
                        .resizable()
                        .scaledToFill()
                        .frame(width: 60, height: 60)
                        .cornerRadius(8)

                    VStack(alignment: .leading) {
                        Text(session.name)
                            .font(.headline)
                        Text(session.price)
                            .font(.subheadline)
                            .foregroundColor(.gray)
                    }
                    
                    Spacer()
                    Button(action: {
                        removeFromFavorites(sessionId: session.sessionId)
                        arrFavSessions.removeAll(where: { $0.sessionId == session.sessionId })
                    }) {
                        Image(systemName: "heart.fill")
                    }
                    .foregroundColor(Color.green)
                }
            }
        }
        .onAppear() {
            self.arrFavSessions = getFavoriteSessions()
        }
        .navigationTitle("Favorites")
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            Button("Remove All") {
                removeAllFromFavorites()
                arrFavSessions.removeAll()
            }
        }
    }
}

