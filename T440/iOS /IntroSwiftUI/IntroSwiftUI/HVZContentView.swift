//
//  HVZContentView.swift
//  IntroSwiftUI
//
//  Created by CP on 29/01/25.
//

// Session 3 - Prof Chintan

import SwiftUI

struct HVZContentView: View {
    var body: some View {
        
//        VStack(alignment: .leading, spacing: 20) {
//            Text("VStack Example")
//                .font(.title)
//            
//            Circle()
//                .fill(.green)
//                .frame(width: 100, height: 100)
//            
//            Rectangle()
//                .fill(.blue)
//                .frame(width: 100, height: 100)
//            
//            HStack() {
//                Text("HStack")
//                Spacer()
//                Circle()
//                    .fill(.green)
//                    .frame(width: 100, height: 100)
//                                
//                Capsule()
//                    .fill(.yellow)
//                    .frame(width: 100, height: 50)
//                
//            }.background(Color.red)
//
//        }.padding(.bottom, 20)
//            .background(Color.red)
//        
//        ZStack {
//            Circle()
//                .fill(.green)
//                .frame(width: 100, height: 100)
//                            
//            Capsule()
//                .fill(.yellow.opacity(0.8))
//                .frame(width: 70, height: 50)
//
//            Text("Hello World")
//                .fontWidth(.compressed)
//        }
        
        VStack {
            
            ZStack {
                Circle()
                    .fill(.gray)
                    .frame(width: 60, height: 60)

                Text("MC")
                    .foregroundColor(.white)
                    .font(.title)
            }
            
            Text("Me Canada")
                .foregroundColor(.green)
                .font(.largeTitle)
            
            HStack {
                ZStack {
                    Rectangle()
                        .fill(.gray)
                        .frame(height: 80)
                        .cornerRadius(20)
                    
                    VStack(spacing: 10) {
                        Image(systemName: "person")
                        Text("message")
                    }
                }
                                
                ZStack {
                    Rectangle()
                        .fill(.gray)
                        .frame(height: 80)
                        .cornerRadius(20)
                    
                    VStack(spacing: 10) {
                        Image(systemName: "person")
                        Text("call")
                    }
                }

                ZStack {
                    Rectangle()
                        .fill(.gray)
                        .frame(height: 80)
                        .cornerRadius(20)
                    
                    VStack(spacing: 10) {
                        Image(systemName: "person")
                        Text("video")
                    }
                }

                ZStack {
                    Rectangle()
                        .fill(.gray)
                        .frame(height: 80)
                        .cornerRadius(20)
                    
                    VStack(spacing: 10) {
                        Image(systemName: "person")
                        Text("mail")
                    }
                }

            }.padding(.leading, 20)
                .padding(.trailing, 20)
        }
        
        Spacer()
    }
}

#Preview {
    HVZContentView()
}
