//
//  Global.swift
//  Chintan_Final
//
//  Created by CP on 11/02/25.
//

import Foundation

var TITLE = "Chintan"
var UD = UserDefaults.standard
var UD_KEY = "PACKAGES"

enum DelieveryStatus: String, Codable {
    case InTransit = "In Transit"
    case Delivered = "Delivered"
}
