//
//  PlantDetailView.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

import SwiftUI
import MapKit

struct PlantDetailView: View {
    @State private var editedPlant: Plant
    @State private var showMap = false
    let onSave: (Plant) -> Void
    @State private var isAlertActivate = false
    @State private var alertMessage = ""
    @Environment(\.presentationMode) var presentationMode
    
    init(plant: Plant, onSave: @escaping (Plant) -> Void) {
        self._editedPlant = State(initialValue: plant)
        self.onSave = onSave
    }
    
    var body: some View {
        VStack(spacing: 20) {
            
            ZStack {
                RoundedRectangle.init(cornerRadius: 10)
                    .fill(.white)
                    .frame(height: 40)
                TextField("Plant Name", text: $editedPlant.name)
                    .padding()
            }

            HStack() {
                Text("Select Plant Type:")
                    .bold()
                    .font(.system(size: 20))
                Spacer()
                Picker(selection: $editedPlant.type, label: Text("Plant Type")) {
                    Text("Indoor").tag("Indoor")
                    Text("Outdoor").tag("Outdoor")
                }
                .pickerStyle(MenuPickerStyle())
                .tint(blueColor)
            }
            
            HStack() {
                Text("Select Plant Size:")
                    .bold()
                    .font(.system(size: 20))
                Spacer()
                Picker(selection: $editedPlant.size, label: Text("Plant Size")) {
                    Text("Small").tag("Small")
                    Text("Medium").tag("Medium")
                    Text("Large").tag("Large")
                }
                .pickerStyle(MenuPickerStyle())
                .tint(blueColor)
            }

            HStack {
                Text("Quantity: \(editedPlant.quantity)")
                    .bold()
                    .font(.system(size: 20))
                Stepper("", value: $editedPlant.quantity, in: 1...10)
            }

            Spacer()
                        
            Button(action: {
                showMap = true
            }) {
                Text("Edit Location")
                    .font(.title2)
                    .foregroundColor(.white)
                    .fontWeight(.bold)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(blueColor)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(.black, lineWidth: 2.5)
            )

            Text("Location: \(String(format: "%.4f", editedPlant.location.latitude)), \(String(format: "%.4f", editedPlant.location.longitude))")
                .font(.system(size: 20))
                .foregroundColor(.black)

            Button(action: {
                if (isValidated()) {
                    presentationMode.wrappedValue.dismiss()
                    onSave(editedPlant)
                }
            }) {
                Text("Save Changes")
                    .font(.title2)
                    .foregroundColor(.white)
                    .fontWeight(.bold)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background(greenColor)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(.black, lineWidth: 2.5)
            )
            .padding(.bottom, 10)
        }
        .alert(isPresented: self.$isAlertActivate) {
            Alert(title: Text("Message!!"), message: Text("\(self.alertMessage)"),dismissButton: .default(Text("OK"), action: {
                print("Alert dismissed!")
            }))
        }
        .padding(2)
        .background(backgroundColor)
        .sheet(isPresented: $showMap) {
            MapView(userLocation: editedPlant.location.coordinate, onLocationSelectedClosure: { newLocation in
                editedPlant.location = PlantLocation(latitude: newLocation.latitude, longitude: newLocation.longitude)
                showMap = false
            })
        }
    }
    
    private func isValidated() -> Bool {
        if (editedPlant.name.isEmpty) {
            self.isAlertActivate = true
            self.alertMessage = "Name cannot be empty!"
            return false
        } else {
            return true
        }
    }
}
