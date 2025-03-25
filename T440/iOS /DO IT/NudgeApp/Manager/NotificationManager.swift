//
//  NotificationManager.swift
//  NudgeApp
//
//  Created by CP on 20/02/25.
//

import UserNotifications

class NotificationManager {
    
    static var shared = NotificationManager()
    private var arrNotificationQuotes = [
                                         
    ]
    
    private var arrCharacters : [String] = []
    
    
    private let center = UNUserNotificationCenter.current()
    
    func scheduleNotifications() {
        self.center.removeAllPendingNotificationRequests()
        let calendar = Calendar.current
        let now = Date()
        var components = calendar.dateComponents([.year, .month, .day], from: now)
        
        
        for hour in 0..<24 {
            for minute in [0, 30] {
                components.hour = hour
                components.minute = minute
                
                if let notificationDate = calendar.date(from: components) {
                    let quote = self.arrNotificationQuotes.randomElement() ?? "Are you following your routine?"
                    let character = self.arrCharacters.randomElement() ?? "Chintan"
                    self.scheduleNotification(at: notificationDate, title: "Hey \(character)!", body: quote)
                }
            }
        }
    }
    
    func scheduleNotification(at date: Date, title: String, body: String) {
        let content = UNMutableNotificationContent()
        content.title = title
        content.body = body
        content.sound = .default
        
        let triggerDate = Calendar.current.dateComponents([.hour, .minute], from: date)
        let trigger = UNCalendarNotificationTrigger(dateMatching: triggerDate, repeats: true)
        
        let notificationId = "Reminder_\(triggerDate.hour!)_\(triggerDate.minute!)"
        let request = UNNotificationRequest(identifier: notificationId, content: content, trigger: trigger)
        
        self.center.add(request) { error in
            if let error = error {
                print("Error scheduling notification: \(error.localizedDescription)")
            }
        }
    }
    
    func removeAllNotifications() {
        self.center.removeAllPendingNotificationRequests()
    }
}
