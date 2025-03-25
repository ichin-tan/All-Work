//
//  NatureListView.swift
//  Group9_Nature
//
//  Created by CP on 12/02/25.
//

import SwiftUI

struct NatureListView: View {
    
    @State private var isGoToNatureDetail: Bool = false
    @State private var isGoToFavorites: Bool = false
    @State private var isGoBackToLogin: Bool = false
    @State private var arrSessions: [Session] = []
    @State private var session: Session?
        
    var body: some View {
        VStack {
            List(arrSessions) { session in
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
                        self.isGoToNatureDetail = true
                        self.session = session
                    }) {
                        Image(systemName: "arrow.right")
                    }
                    .foregroundColor(Color.green)
                }
            }
        }
        .onAppear() {
            assignDictFavorite()
            self.arrSessions = sessions
        }
        .navigationTitle("Nature Walk Sessions")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden(true)
        .navigationDestination(isPresented: $isGoToNatureDetail) {
            if let session = self.session {
                NatureDetailView(session: session)
            }
        }
        .navigationDestination(isPresented: $isGoToFavorites) {
            FavoriteListView()
        }
        .navigationDestination(isPresented: $isGoBackToLogin) {
            LoginView()
        }
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Menu {
                    Button(action: {
                        print("Favorites")
                        self.isGoToFavorites = true
                    }) {
                        HStack {
                            Text("Favorites")
                            Image(systemName: "heart.fill")
                        }
                    }
                    
                    Button(action: {
                        print("Logout")
                        logout()
                        isGoBackToLogin = true
                    }) {
                        HStack {
                            Text("Logout")
                            Image(systemName: "rectangle.portrait.and.arrow.right")
                        }
                    }
                    
                } label: {
                    Label("Option", systemImage: "ellipsis.circle")
                }
                .tint(Color.green)
            }
        }
    }
}
