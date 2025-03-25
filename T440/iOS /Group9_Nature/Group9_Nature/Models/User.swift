//
//  User.swift
//  Group9_Nature
//
//  Created by CP on 12/02/25.
//

import Foundation

class User: Identifiable, Codable {
    var id = UUID().uuidString
    var userId: Int
    let email: String
    let password: String
    var rememberMePreference: Bool
    
    init(userId: Int, email: String, password: String, rememberMePreference: Bool) {
        self.userId = userId
        self.email = email
        self.password = password
        self.rememberMePreference = rememberMePreference
    }
}
