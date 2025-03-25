//
//  ContentView.swift
//  CryptoApp
//
//  Created by CP on 06/03/25.
//

import SwiftUI

struct ContentView: View {
    
    @ObservedObject var viewModel = CryptoViewModel()
    
    var body: some View {
        
        NavigationView {
            VStack {
                List {
                    ForEach(self.viewModel.coins) { coin in
                        NavigationLink(destination: CoinDetailView(viewModel: self.viewModel, coinId: coin.id)) {
                            Text("\(coin.name)")
                        }
                    }
                }
            }
            .padding()
            .onAppear {
                self.viewModel.fetchCoins()
            }
        }
    }
}

#Preview {
    ContentView()
}
