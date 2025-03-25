//
//  PlantOrderView.swift
//  Chintan_Plants
//
//  Created by CP on 05/03/25.
//

// PlantOrderView.swift
import SwiftUI
import MapKit

var greenColor: Color = Color(uiColor: UIColor(red: 28/255, green: 176/255, blue: 63/255, alpha: 1))
var blueColor: Color = Color(uiColor: UIColor(red: 42/255, green: 78/255, blue: 222/255, alpha: 1))
var backgroundColor: Color = Color(uiColor: UIColor(red: 205/255, green: 247/255, blue: 218/255, alpha: 1))


struct PlantOrderView: View {
    @State private var txtPlantName: String = ""
    @State private var plantType = "Indoor"
    @State private var plantSize = "Medium"
    @State private var quantity = 1
    @State private var showMap = false
    @State private var isAlertActivate = false
    @State private var alertMessage = ""
    @State private var selectedLocation: CLLocationCoordinate2D?
    @StateObject private var locationManager = LocationManager()
    
    private let plantTypes = ["Indoor", "Outdoor"]
    private let plantSizes = ["Small", "Medium", "Large"]
        
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                Text("Chintan Plants")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(greenColor)
                
                ZStack {
                    RoundedRectangle.init(cornerRadius: 10)
                        .fill(.white)
                        .frame(height: 40)
                    TextField("Plant Name", text: $txtPlantName)
                        .padding()
                }
                
                HStack() {
                    Text("Select Plant Type:")
                        .bold()
                        .font(.system(size: 20))
                    Spacer()
                    Picker(selection: $plantType, label: Text("Plant Type")) {
                        ForEach(plantTypes, id: \.self) { type in
                            Text(type)
                                .tag(type)
                        }
                    }
                    .pickerStyle(MenuPickerStyle())
                    .tint(blueColor)
                }
                
                HStack() {
                    Text("Select Plant Size:")
                        .bold()
                        .font(.system(size: 20))
                    Spacer()
                    Picker(selection: $plantSize, label: Text("Plant Size")) {
                        ForEach(plantSizes, id: \.self) { size in
                            Text(size)
                                .tag(size)
                        }
                    }
                    .pickerStyle(MenuPickerStyle())
                    .tint(blueColor)
                }
                
                
                HStack {
                    Text("Quantity: \(quantity)")
                        .bold()
                        .font(.system(size: 20))
                    Stepper("", value: $quantity, in: 1...10)
                }
                
                Spacer()
                
                Button(action: {
                    showMap = true
                }) {
                    Text("Add Location")
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
                
                if let location = selectedLocation {
                    Text("Location: \(String(format: "%.4f", location.latitude)), \(String(format: "%.4f", location.longitude))")
                        .font(.system(size: 20))
                        .foregroundColor(.black)
                }
                
                Button(action: {
                    if (isValidated()) {
                        self.alertMessage = "Plant added successfully!"
                        self.isAlertActivate = true
                        addPlant()
                    }
                }) {
                    Text("Add Plant")
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
                .alert(isPresented: self.$isAlertActivate) {
                    Alert(title: Text("Message!!"), message: Text("\(self.alertMessage)"),dismissButton: .default(Text("OK"), action: {
                        print("Alert dismissed!")
                    }))
                }
            }
            .padding()
            .background(backgroundColor)
        }
        .sheet(isPresented: $showMap) {
            MapView(userLocation: locationManager.currentLocation,
                    onLocationSelectedClosure: { location in
                        selectedLocation = location
                        showMap = false
                    }
            )
        }
    }
    
    private func addPlant() {
        guard let location = selectedLocation ?? locationManager.currentLocation else {
            self.isAlertActivate = true
            self.alertMessage = "Coud not save plant. Please add a location."
            return
        }
        
        let plant = Plant(
            name: txtPlantName,
            type: plantType,
            size: plantSize,
            quantity: quantity,
            location: PlantLocation(latitude: location.latitude, longitude: location.longitude)
        )
        
        FirebaseManager.shared.savePlant(plant)
        txtPlantName = ""
        plantType = "Indoor"
        plantSize = "Medium"
        quantity = 1
        selectedLocation = nil

    }
    
    private func isValidated() -> Bool {
        if (self.txtPlantName.isEmpty) {
            self.isAlertActivate = true
            self.alertMessage = "Name cannot be empty!"
            return false
        } else {
            return true
        }
    }
}
