//
//  ViewController.swift
//  NudgeApp
//
//  Created by CP on 20/02/25.
//

import UIKit

var isNotification : Bool {
    set {
        UserDefaults.standard.set(newValue, forKey: "isNotification")
    }
    
    get {
        return UserDefaults.standard.value(forKey: "isNotification") as? Bool ?? true
    }
}

class ViewController: UIViewController {

    @IBOutlet weak var btnAlarms: UIButton!
    @IBOutlet weak var btnNotification: UIButton!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.btnAlarms.layer.cornerRadius = 10
        self.btnNotification.layer.cornerRadius = 10
    }
    
    func showAlert(message: String, completion: (() -> ())? = nil) {
        let alert = UIAlertController(title: "", message: message, preferredStyle: UIAlertController.Style.alert)

        let okAction = UIAlertAction(title: "Ok", style: .default) { _ in
            self.dismiss(animated: true) {
                if let completion = completion {
                    completion()
                }
            }
        }
                    
        alert.addAction(okAction)
        
        self.present(alert, animated: true, completion: nil)
    }

    @IBAction func btnNotificationTapped(_ sender: UIButton) {
        isNotification = true
        AlarmManager.shared.removeAllAlarms()
        NotificationManager.shared.scheduleNotifications()
        self.showAlert(message: "Notification Mode On!")
    }
    
    @IBAction func btnAlarmTapped(_ sender: UIButton) {
        isNotification = false
        NotificationManager.shared.removeAllNotifications()
        AlarmManager.shared.scheduleAlarms()
        self.showAlert(message: "Alarm Mode On!")
    }
}

