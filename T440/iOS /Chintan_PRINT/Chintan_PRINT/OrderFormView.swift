//
//  OrderFormView.swift
//  Chintan_PRINT
//
//  Created by CP on 05/02/25.
//

import SwiftUI

struct OrderFormView: View {
    
    @StateObject private var order = Order()
    @State private var isShowAlert = false
    @State private var isGoToReceiptScreen = false
    
    var body: some View {
        
        NavigationStack {
            VStack {
                Form {
                    Section(header:
                                Text("Print Section")
                        .foregroundColor(.black)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .padding([.bottom, .top], 15)
                    ) {
                        ZStack {
                            Rectangle()
                                .foregroundColor(Color.init(red: 224/255, green: 175/255, blue: 160/255))
                            
                            VStack {
                                Picker("Print Type", selection: $order.printType) {
                                    ForEach(["Photo", "Canvas"], id: \.self) { printType in
                                        Text(printType)
                                    }
                                }
                                .padding([.leading, .trailing], 10)
                                .pickerStyle(.menu)
                                .onChange(of: order.printType) { oldValue, newValue in
                                    order.printSize = order.getPrintSizes().first ?? ""
                                    order.quantity = order.getQuantityRange().lowerBound
                                }
                                
                                Picker("Print Size", selection: $order.printSize) {
                                    ForEach(order.getPrintSizes(), id: \.self) { size in
                                        Text(size)
                                    }
                                }
                                .padding([.leading, .trailing], 10)
                                .pickerStyle(.menu)
                                
                                Stepper("Quantity: \(order.quantity)", value: $order.quantity, in: order.getQuantityRange())
                                    .padding([.leading, .trailing, .bottom], 10)

                            }
                        }
                    }
                    .listRowInsets(EdgeInsets())
                    
                    Section(header:
                                Text("Order Section")
                        .foregroundColor(.black)
                        .font(.subheadline)
                        .fontWeight(.semibold)
                        .padding(.bottom, 15)

                    ) {
                        ZStack {
                            Rectangle()
                                .foregroundColor(Color.init(red: 224/255, green: 175/255, blue: 160/255))
                            
                            VStack {
                                TextField("Enter phone number", text: $order.customerPhoneNumber)
                                    .keyboardType(.phonePad)
                                    .padding(10)

                                
                                TextField("Enter discount code", text: $order.orderDiscountCode)
                                    .padding(10)

                                Toggle("Add Delivery ($5.99)", isOn: $order.isDeliverySelected)
                                    .padding(10)

                                Button("Place Order") {
                                    print("Place order!!")
                                    if(order.isValidOrder()) {
                                        self.isGoToReceiptScreen = true
                                    } else {
                                        self.isShowAlert = true
                                    }
                                }
                                .alert(isPresented: $isShowAlert) {
                                    Alert(title: Text("Alert!"),
                                          message: Text(order.getErrorMessage()),
                                          dismissButton: .default(Text("OK")) {
                                        print("OK tapped!")
                                    }
                                    )
                                }
                                .padding([.top,.bottom], 10)
                                .frame(maxWidth: .infinity)
                                .background(Color.init(red: 39/255, green: 71/255, blue: 110/255))
                                .foregroundColor(.white)
                            }
                        }
                    }
                    .listRowInsets(EdgeInsets())
                    
                }
                .cornerRadius(20)
            }
            .navigationDestination(isPresented: $isGoToReceiptScreen) {
                OrderReceiptView(order: self.order)
            }
            .padding()
            .background(Color.init(red: 39/255, green: 71/255, blue: 110/255))
            .navigationTitle(Text("PRINT APP"))
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Reset") {
                        self.order.resetOrder()
                    }
                    .buttonStyle(.borderedProminent)
                }
            }
        }
    }
}

#Preview {
    OrderFormView()
}
