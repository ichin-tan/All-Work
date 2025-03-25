//
//  Extensions.swift
//  Group3_Gym
//
//  Created by CP on 22/01/25.
//

import Foundation

extension String {
    
    func isValidTime() -> Bool {
        let formatter = DateFormatter()
        formatter.dateFormat = "h:mm a"
        if let _ = formatter.date(from: self) {
            return true
        }
        return false
    }
    
}
