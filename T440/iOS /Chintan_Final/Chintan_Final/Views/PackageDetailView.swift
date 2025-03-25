//
//  PackageDetailView.swift
//  Chintan_Final
//
//  Created by CP on 11/02/25.
//

import SwiftUI

struct PackageDetailView: View {
    
    @State private var packageID = ""
    @State private var deliveryAddress = ""
    @State private var deliveryDate = Date()
    @State private var carrier = "FedEx"
    @State private var deliveryStatus = false
    
    let carriers = ["FedEx", "UPS", "DHL"]
    @State var errorMessage = ""
    @State private var isShowAlert = false
    
    @ObservedObject var packageManager: PackageManager
    var packageUuid: String

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
                
                Button("Update Package") {
                    if (isValidData()) {
                        
                        let status: DelieveryStatus = self.deliveryStatus ? .Delivered : .InTransit
                        let updatedPackage = Package(id: self.packageUuid, packageId: Int(self.packageID) ?? 0, deliveryAddress: self.deliveryAddress, deliveryDate: self.deliveryDate, carrier: self.carrier, deliveredStatus: status)
                        self.packageManager.update(with: updatedPackage)
                        self.isShowAlert = true
                    }
                }
            }
            .cornerRadius(15)
        }
        .onAppear() {
            
            if let pac = self.packageManager.getPackageBy(id: self.packageUuid) {
                self.packageID = String(pac.packageId)
                self.deliveryAddress = pac.deliveryAddress
                self.deliveryDate = pac.deliveryDate
                self.deliveryStatus = pac.deliveredStatus == .Delivered
                self.carrier = pac.carrier
            }
        }
        .navigationTitle("View & Update Package")
        .navigationBarTitleDisplayMode(.inline)
        .padding()
        .background(Color.indigo.opacity(0.5))
        .alert(isPresented: $isShowAlert) {
            Alert(title: Text("Final Exam"),
                  message: Text( errorMessage == "" ? "Package Updated!" : errorMessage),
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
