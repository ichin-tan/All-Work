//
//  ContentView.swift
//  Light
//
//  Created by CP on 05/02/25.
//

import SwiftUI

struct ContentView: View {
    @ObservedObject var mqttManager = MQTTManager.shared

    var body: some View {
        VStack {
            Text("IoT Smart Light")
                .font(.largeTitle)
                .padding()
            
            Image(systemName: mqttManager.isLightOn ? "lightbulb.fill" : "lightbulb.slash.fill")
                .resizable()
                .scaledToFit()
                .frame(width: 100, height: 100)
                .foregroundColor(mqttManager.isLightOn ? .yellow : .gray)
                .padding()

            Button(action: {
                mqttManager.toggleLight()
            }) {
                Text(mqttManager.isLightOn ? "Turn Off" : "Turn On")
                    .font(.title2)
                    .padding()
                    .frame(width: 200)
                    .background(mqttManager.isLightOn ? Color.red : Color.green)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .padding()
            
//            VStack {
//                Text("Brightness: \(mqttManager.brightness)%")
//                    .font(.headline)
//                
//                Slider(value: Binding(
//                    get: { Double(mqttManager.brightness) },
//                    set: { mqttManager.setBrightness(Int($0)) }
//                ), in: 0...100)
//                .padding()
//            }
        }
        .padding()
    }
}
