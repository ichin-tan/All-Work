//
//  CryptoViewModel.swift
//  CryptoApp
//
//  Created by CP on 06/03/25.
//

import Foundation
import Alamofire

let coinsURL = "https://api.coinlore.net/api/tickers/"

class CryptoViewModel: ObservableObject {
    
    @Published var coins: [Coin] = []

    
    func fetchCoins() {
        
        AF.request(coinsURL)
            .validate()
            .response { res in
                switch res.result {
                    case .success(let responseData):
                        do {
                            if let responseData = responseData {
                                let jsonData = try JSONDecoder().decode(CoinResponse.self, from: responseData)
                                self.coins = jsonData.data
//                                self.coins = jsonData.filter({ $0.type == "coin" })
                            }
                        } catch {
                            print("Error decoding coins!")
                        }
                        
                    case .failure(let error):
                        print("Error fetching coins! \(error.localizedDescription)")
                }
            }
    }
    
    func getCoinDetails(coinID: String) -> Coin? {
        if let coin = self.coins.first(where: { $0.id == coinID }) {
            return coin
        }
        return nil
    }
}
