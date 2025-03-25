//
//  PetDataEntryView.swift
//  TabNavigationApp
//
//  Created by CP on 04/02/25.
//

import SwiftUI

struct PetDataEntryView: View {
    
    @EnvironmentObject var petStore: PetStoreModel
    
    @State private var name: String = ""
    @State private var type: String = ""
    @State private var age: String = ""
    @State private var isShowAlert = false
    
    private var ageInt: Int {
        return Int(age) ?? 1
    }
    
    var body: some View {
        
        NavigationStack {
            
            VStack {
                Form {
                    Section {
                        TextField("Name", text: $name)
                            .font(.headline)
                            .autocorrectionDisabled(true)
                            .textFieldStyle(.roundedBorder)
                        
                        TextField("Type", text: $type)
                            .font(.headline)
                            .autocorrectionDisabled(true)
                            .textFieldStyle(.roundedBorder)

                        TextField("Age", text: $age)
                            .font(.headline)
                            .autocorrectionDisabled(true)
                            .textFieldStyle(.roundedBorder)
                    }
                    
                    Section {
                        Button("Add Pet") {
                            let pet = PetModel(name: name, type: type, age: ageInt)
                            self.petStore.pets.append(pet)
                            print("Added")
                            isShowAlert = true
                            
                            self.name = ""
                            self.type = ""
                            self.age = ""
                        }
                    }
                }
            }
            .alert(isPresented: $isShowAlert) {
                Alert(title: Text("Pet Added!"),
                      message: Text("Pet added successfully!"),
                      dismissButton: .default(Text("OK")))
            }
            .navigationTitle("Add Pet")
            .navigationBarTitleDisplayMode(.inline)
            .onChange(of: self.petStore.pets.count) { oldValue, newValue in
                print(oldValue)
                print(newValue)
            }
        }
    }
}

#Preview {
    PetDataEntryView()
}
