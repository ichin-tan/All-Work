//
//  MQQTManager.swift
//  Light
//
//  Created by CP on 05/02/25.
//

import Foundation
import CocoaMQTT

class MQTTManager: ObservableObject {
    static let shared = MQTTManager()
    private var mqtt: CocoaMQTT?
    @Published var isLightOn = false
    @Published var brightness: Int = 50

    private let mqttHost = "6c920fceac5b4694ab4461ce655774e5.s1.eu.hivemq.cloud"
    private let mqttPort: UInt16 = 8884
    private let clientID = "SwiftUI-IoT-App-\(UUID().uuidString)"
    private let topicLight = "home/light"
    
    private init() {
        mqtt = CocoaMQTT(clientID: clientID, host: mqttHost, port: mqttPort)
        mqtt?.enableSSL = true
        mqtt?.username = "CodingPirate004"
        mqtt?.password = "CodingPirate004"
        mqtt?.delegate = self
        mqtt?.keepAlive = 60
        mqtt?.allowUntrustCACertificate = true
        mqtt?.connect()

    }

    func toggleLight() {
        isLightOn.toggle()
        let message = isLightOn ? "ON" : "OFF"
        mqtt?.publish(topicLight, withString: message)
    }
    
}

extension MQTTManager: CocoaMQTTDelegate {
    func mqtt(_ mqtt: CocoaMQTT, didPublishAck id: UInt16) {
        print("Did publish ack")
    }
    
    func mqtt(_ mqtt: CocoaMQTT, didUnsubscribeTopics topics: [String]) {
        print("Did unsubscribe topics")
    }
    
    func mqttDidPing(_ mqtt: CocoaMQTT) {
        print("Did ping")
    }
    
    func mqttDidReceivePong(_ mqtt: CocoaMQTT) {
        print("Did receive ping")
    }
    
    func mqtt(_ mqtt: CocoaMQTT, didConnectAck ack: CocoaMQTTConnAck) {
        print("✅ Connected with ACK: \(ack)")
        mqtt.subscribe(topicLight)
        mqtt.publish("home/light", withString: "ligar")

    }
    
    func mqtt(_ mqtt: CocoaMQTT, didReceiveMessage message: CocoaMQTTMessage, id: UInt16) {
        print("Did receive ack")
        if message.topic == topicLight {
            isLightOn = (message.string == "ON")
        }
    }
    
    func mqttDidDisconnect(_ mqtt: CocoaMQTT, withError err: Error?) {
        if let error = err {
            print("Disconnected with error: \(error.localizedDescription)")
        } else {
            print("Disconnected with no error")
        }
    }
    
    func mqtt(_ mqtt: CocoaMQTT, didPublishMessage message: CocoaMQTTMessage, id: UInt16) {
        print("Did publish message")
    }
    
    func mqtt(_ mqtt: CocoaMQTT, didSubscribeTopics success: NSDictionary, failed: [String]) {
        print("Did subscribe topics")
    }
}
