//
//  Coin.swift
//  CryptoApp
//
//  Created by CP on 06/03/25.
//

import Foundation

struct CoinResponse: Codable {
    
    let data: [Coin]
    
}

struct Coin: Identifiable, Codable {
    
    var id: String
    let name: String
    let symbol: String
    let price_usd: String
    let rank: Int
//    let tsupply: String
//    let msupply: String
//    let csupply: String
}
