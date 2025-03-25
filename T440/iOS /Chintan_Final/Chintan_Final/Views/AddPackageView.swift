//
//  AddPackageView.swift
//  Chintan_Final
//
//  Created by CP on 11/02/25.
//

import SwiftUI

struct AddPackageView: View {
    
    @State private var packageID = ""
    @State private var deliveryAddress = ""
    @State private var deliveryDate = Date()
    @State private var carrier = "FedEx"
    @State private var deliveryStatus = false
    
    let carriers = ["FedEx", "UPS", "DHL"]
    @State var errorMessage = ""
    @State private var isShowAlert = false
    
    @ObservedObject var packageManager: PackageManager
    
    var body: some View {
        
        VStack {
            Form {
                TextField("Enter Package ID", text: self.$packageID)
                    .keyboardType(.numberPad)
                
                TextField("Enter Delivery Address", text: self.$deliveryAddress)
                
                DatePicker("Delivery Date", selection: self.$deliveryDate, displayedComponents: .date)
                
                Picker("Carrier", selection: self.$carrier) {
                    ForEach(self.carriers, id: \.self) { carrier in
                        Text(carrier)
                    }
                }
                
                Toggle("Delivered", isOn: self.$deliveryStatus)
                
                Button("Add Package") {
                    if (isValidData()) {
                        let status: DelieveryStatus = self.deliveryStatus ? .Delivered : .InTransit
                        let newPackage = Package(packageId: Int(self.packageID) ?? 0, deliveryAddress: self.deliveryAddress, deliveryDate: self.deliveryDate, carrier: self.carrier, deliveredStatus: status)
                        self.packageManager.add(package: newPackage)
                        self.isShowAlert = true
                    }
                }
            }
            .cornerRadius(15)
        }
        .navigationTitle("Add Package")
        .navigationBarTitleDisplayMode(.inline)
        .padding()
        .background(Color.indigo.opacity(0.5))
        .alert(isPresented: $isShowAlert) {
            Alert(title: Text("Final Exam"),
                  message: Text(errorMessage == "" ? "Package Added!" : errorMessage),
                  dismissButton: .default(Text("OK")))
        }
    }
    
    func isValidData() -> Bool {
        if(self.packageID == "" || Int(self.packageID) == nil) {
            self.errorMessage = "Package Id is required. It should be a number!"
            self.isShowAlert = true
            return false
        } else if(self.deliveryAddress == "") {
            self.errorMessage = "Delivery Address is required!"
            self.isShowAlert = true
            return false
        }  else {
            self.errorMessage = ""
            return true
        }
    }
}
