//
//  ProductViewModel.swift
//  FakeStoreApi
//
//  Created by CP on 06/03/25.
//

import Foundation
import Alamofire

class ProductViewModel: ObservableObject {
    
    @Published var categories: [Category] = []
    @Published var products: [Product] = []
    
    func fetchCategories() {
        let apiURL = "https://fakestoreapi.com/products/categories"
        
        AF.request(apiURL)
            .validate()
            .response { res in
                switch res.result {
                    case .success(let responseData):
                        do {
                            if let responseData = responseData {
                                let jsonData = try JSONDecoder().decode([String].self, from: responseData)
                                self.categories = jsonData.map({ Category(name: $0) })
                                self.categories.append(Category(name: "all"))
                            }
                        } catch {
                            print("Error decoding categories!")
                        }
                        
                    case .failure(let error):
                        print("Error fetching categories! \(error.localizedDescription)")
                }
            }
    }
    
    
    func fetchAllProducts(completion: @escaping ((Bool) -> ())) {
        let apiURL = "https://fakestoreapi.com/products"
        
        AF.request(apiURL)
            .validate()
            .response { res in
                switch res.result {
                    case .success(let responseData):
                        do {
                            if let responseData = responseData {
                                let products = try JSONDecoder().decode([Product].self, from: responseData)
                                self.products = products
                                completion(true)
                            }
                        } catch {
                            print("Error decoding products!")
                        }
                        
                    case .failure(let error):
                        print("Error fetching products! \(error.localizedDescription)")
                }
            }
    }
    
    func filterProductsBasedOnCategory(category: String) -> [Product] {
        
        if(category == "all") {
            return products
        }
        
        return products.filter({ $0.category == category })
        
    }
}
