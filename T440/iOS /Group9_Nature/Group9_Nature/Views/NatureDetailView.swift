//
//  NatureDetailView.swift
//  Group9_Nature
//
//  Created by CP on 12/02/25.
//

import SwiftUI

struct NatureDetailView: View {
    
    var session: Session
    @State var isFavorite: Bool = false
    
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                TabView {
                    ForEach(session.photos, id: \.self) { photo in
                        Image(photo)
                            .resizable()
                            .scaledToFill()
                            .frame(height: 200)
                            .clipped()
                            .cornerRadius(10)
                    }
                }
                .tabViewStyle(PageTabViewStyle())
                .frame(height: 200)

                Text(session.name)
                    .font(.title)
                    .fontWeight(.bold)

                HStack {
                    ForEach(0..<5, id: \.self) { starIndex in
                        Image(systemName: starIndex < session.rating ? "star.fill" : "star")
                            .foregroundColor(.yellow)
                    }
                }

                Text(session.description)
                    .font(.body)
                    .foregroundColor(.gray)

                Text("Hosted by: \(session.guideName)")
                    .font(.subheadline)
                
                HStack {
                    Text("Guide Number:")
                    
                    Button(action: {
                        let strPhone = "tel://\(session.guideNumber)"
                        guard let url = URL(string: strPhone) else { return }
                        UIApplication.shared.open(url)
                    }) {
                       Text("\(session.guideNumber)")
                            .foregroundColor(Color.green)
                    }
                }
                
                Text("Price: \(session.price) per person")
                    .font(.headline)

                HStack {
                    Button(action: {
                        
                        if(!isFavorite) {
                            self.isFavorite = true
                            if let currentUser = getCurrentUserFromUD() {
                                var alreadyFavoritesForUser = getUserFavoriteSessionIDsFromUD(userId: String(currentUser.userId))
                                alreadyFavoritesForUser.append(session.sessionId)
                                saveFavoriteSessionsIdFor(userId: String(currentUser.userId), favoriteSessionId: alreadyFavoritesForUser)
                            }
                        }
                    }) {
                        Image(systemName: !isFavorite ? "heart" : "checkmark")
                            .padding()
                            .background(Color.green)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }

                    ShareLink(items: [session.name, session.price]) {
                        Image(systemName: "square.and.arrow.up")
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(8)
                    }
                }
            }
            .onAppear() {
                if let currentUser = getCurrentUserFromUD() {
                    let alreadyFavoritesForUser = getUserFavoriteSessionIDsFromUD(userId: String(currentUser.userId))
                    if (alreadyFavoritesForUser.contains(self.session.sessionId)) {
                        self.isFavorite = true
                    }
                }
            }
            .padding()
        }
        .navigationTitle("Session Details")
    }
}
