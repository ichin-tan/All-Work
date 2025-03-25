//
//  ContentView.swift
//  MultiScreenApp
//
//  Created by CP on 03/02/25.
//


// ObservableObject - Protocol - allows the class object to be observed, its used to update the UI when object property changes

// @Published - Annotation - It allows the property to be observable, allows swift ui to regenerate UI when the value of the property changes

// @StateObject - Annotation - Indicates creation of ObservableObject - allows sharing the reference of the object as Environment Object

// @EnvironmentObject - annotation - must be provided by ancestor - allows the screen to observe the @StateObject and @ObservedObject

// @ObservedObject - annotation - indicates the observed object


import SwiftUI

struct ContentView: View {
    @State private var username: String = ""
    @State private var isShowMango: Bool = false
    @State private var isShowTomato: Bool = false
    @State private var isShowDragonFruit: Bool = false
    
    // Indicates ownership of creating user @stateObject
    // Contentview is responsible to create instance of User class
    @StateObject private var user: User = User()

    var body: some View {
        NavigationStack {
            VStack {
                
                TextField("Username", text: $username)
                    .font(.title)
                    .textFieldStyle(.roundedBorder)
                
                NavigationLink(destination: Text("Apple")) {
                    Text("Go to apple")
                }
                
                NavigationLink {
                    AppleScreenView(message: "HEy AppLe!")
                } label: {
                    Text("Apple screen 123")
                }
                
                NavigationLink(destination: OrangeScreenView()) {
                    Label("Orange Screen", systemImage: "person")
                }
                
                Button {
                    if (self.username.isEmpty) {
                        print("User name can not be empty!")
                    } else {
                        
                        self.user.username = self.username
                        self.user.email = "\(self.username)@gmail.com"
                        self.user.favFruit = "Mango"
                        
                        isShowMango = true
                        // This will not work
//                        NavigationLink(destination: MangoScreenView()) {
//                            Label("Mango Screen", systemImage: "person")
//                        }
                    }
                } label: {
                    Text("Go to mango screen")
                        .font(.headline)
                        .fontWeight(.bold)
                }
                .buttonStyle(.borderedProminent)
                
                Button {
                    self.user.favFruit = "Tomato"
                    self.isShowTomato = true
                } label: {
                    Text("Go to Tomato screen")
                        .font(.headline)
                        .fontWeight(.bold)
                }
                .buttonStyle(.borderedProminent)

                Button {
//                    self.user.favFruit = "Dragon fruit"
                    self.isShowDragonFruit = true
                } label: {
                    Text("Go to Dragon Fruit screen")
                        .font(.headline)
                        .fontWeight(.bold)
                }
                .buttonStyle(.borderedProminent)
            }
            .padding()
            .frame(maxWidth: .infinity)
            .navigationTitle(Text("Content View"))
            .navigationDestination(isPresented: $isShowMango) {
                MangoScreenView(userInfo: self.user)
            }
            .navigationDestination(isPresented: $isShowTomato) {
//                TomatoScreenView(userInfo: self.user)
                
                TomatoScreenView().environmentObject(self.user)
            }
            .navigationDestination(isPresented: $isShowDragonFruit) {
                DragonFruitScreenView(user: user)
            }
        }
    }
}

#Preview {
    ContentView()
}


// We can not reassign a StateObject property
