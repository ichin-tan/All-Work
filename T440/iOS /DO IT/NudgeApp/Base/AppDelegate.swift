//
//  AppDelegate.swift
//  NudgeApp
//
//  Created by CP on 20/02/25.
//

import UIKit
import UserNotifications

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.requestNotificationAuthorization()
        isNotification ? NotificationManager.shared.scheduleNotifications() : AlarmManager.shared.scheduleAlarms()
        return true
    }

    func requestNotificationAuthorization() {
        let center = UNUserNotificationCenter.current()
        center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                print("Notification authorization granted")
            } else {
                print("Notification authorization denied")
            }
        }
    }
}
