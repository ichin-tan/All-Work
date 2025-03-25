//
//  User.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//

import Foundation

class User: CustomStringConvertible, ObservableObject {
    
    var username: String
    var email: String
    @Published var favFruit: String
    
    
    init() {
        self.username = "NA"
        self.email = "NA"
        self.favFruit = "NA"
    }
    
    init(username: String, favFruit: String) {
        self.username = username
        self.email = "\(username)@gmail.com"
        self.favFruit = favFruit
    }
    
    var description: String {
        return "User name: \(self.username), Email: \(self.email), Fav fruit: \(self.favFruit)"
    }
}


// When published proprty changes, swift ui will update it everywhere it is used. For any property to be published, it's class has to conform the ObservableObject protocol
