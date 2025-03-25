//
//  Global.swift
//  Group9_Nature
//
//  Created by CP on 12/02/25.
//

import Foundation

var UD = UserDefaults.standard
var UD_KEY_CURRENT_USER = "CURRENT_USER"
var UD_KEY_FAVORITE_SESSIONS = "FAVORITE_SESSIONS"
var dictFavorite: [String: [Int]] = [:]

let arrUsers = [
    User(userId: 1, email: "test@gmail.com", password: "test123", rememberMePreference: false),
    User(userId: 2, email: "admin@gmail.com", password: "admin123", rememberMePreference: false)
]

let sessions: [Session] = [
    Session(sessionId: 1, name: "Sunset Valley Walk", price: "$20", description: "A serene walk through the valley during sunset.", rating: 4, guideName: "Nature Explorers", isFavorite: false, photos: ["sunset1", "sunset2"], guideNumber: "9878379026"),
    Session(sessionId: 2, name: "Mountain Meadow Hike", price: "$25", description: "Explore the lush meadows of the mountains.", rating: 3, guideName: "Adventure Guides", isFavorite: false, photos: ["meadow1", "meadow2"], guideNumber: "4562781972"),
    Session(sessionId: 3, name: "Forest Trail Adventure", price: "$30", description: "A thrilling walk through dense forest trails.", rating: 5, guideName: "Wilderness Experts", isFavorite: false, photos: ["forest1", "forest2"], guideNumber: "4367926892")
]

func checkEmailExistInDatabase(email: String) -> Bool {
    if let _ = arrUsers.first(where: { $0.email == email }) {
        return true
    }
    return false
}

func checkForCorrectPassword(email: String, password: String) -> Bool {
    if let user = arrUsers.first(where: { $0.email == email }) {
        return user.password == password
    }
    return false
}

func getCurrentUserFromUD() -> User? {
    if let udCurrentUserData = UD.data(forKey: UD_KEY_CURRENT_USER),
       let currentUser = try? JSONDecoder().decode(User.self, from: udCurrentUserData) {
        return currentUser
    }
    return nil
}

func saveCurrentUserInUD(user: User) {
    if let udCurrentUserData = try? JSONEncoder().encode(user) {
        UD.set(udCurrentUserData, forKey: UD_KEY_CURRENT_USER)
    } else {
        print("Coudn't save data to user defaults!")
    }
}

func saveFavoriteSessionsIdFor(userId: String, favoriteSessionId: [Int]) {
    dictFavorite[userId] = favoriteSessionId
    UD.set(dictFavorite, forKey: UD_KEY_FAVORITE_SESSIONS)
}

func getUserFavoriteSessionIDsFromUD(userId: String) -> [Int] {
    if let favDict = UD.dictionary(forKey: UD_KEY_FAVORITE_SESSIONS) as? [String: [Int]] {
        return favDict[userId] ?? []
    }
    return []
}

func assignDictFavorite() {
    for user in arrUsers {
        let favs = getUserFavoriteSessionIDsFromUD(userId: String(user.userId))
        if (favs.count != 0) {
            dictFavorite[String(user.userId)] = favs
        }
    }
}

func getFavoriteSessions() -> [Session] {
    var favSessions: [Session] = []
    if let currentUser = getCurrentUserFromUD() {
        let fav = getUserFavoriteSessionIDsFromUD(userId: String(currentUser.userId))
        favSessions = sessions.filter({ fav.contains($0.sessionId) })
        favSessions = favSessions.map({ session in
            session.isFavorite = true
            return session
        })
        return favSessions
    }
    return []
}

func removeFromFavorites(sessionId: Int) {
    if let currentUser = getCurrentUserFromUD() {
        var fav = getUserFavoriteSessionIDsFromUD(userId: String(currentUser.userId))
        fav.removeAll(where: { $0 == sessionId })
        saveFavoriteSessionsIdFor(userId: String(currentUser.userId), favoriteSessionId: fav)
    }
}

func removeAllFromFavorites() {
    if let currentUser = getCurrentUserFromUD() {
        var fav = getUserFavoriteSessionIDsFromUD(userId: String(currentUser.userId))
        fav.removeAll()
        saveFavoriteSessionsIdFor(userId: String(currentUser.userId), favoriteSessionId: fav)
    }
}

func logout() {
    // I do not want to remove favorite data
    UserDefaults.standard.removeObject(forKey: UD_KEY_CURRENT_USER)
}
