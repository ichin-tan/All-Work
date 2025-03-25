//
//  CoinDetailView.swift
//  CryptoApp
//
//  Created by CP on 06/03/25.
//

import SwiftUI

struct CoinDetailView: View {
    
    @ObservedObject var viewModel: CryptoViewModel
    var coinId: String
    @State private var localCoin: Coin?

    var body: some View {
        
        VStack {
            Text(self.localCoin?.name ?? "")
            Text(self.localCoin?.symbol ?? "")
            Text(self.localCoin?.price_usd ?? "")
//            Text(self.localCoin?.csupply ?? "")
//            Text(self.localCoin?.msupply ?? "")
//            Text(self.localCoin?.tsupply ?? "")
        }
        .onAppear() {
            self.localCoin = self.viewModel.getCoinDetails(coinID: coinId)
        }
    }
}

#Preview {
    CoinDetailView(viewModel: CryptoViewModel(), coinId: "")
}
