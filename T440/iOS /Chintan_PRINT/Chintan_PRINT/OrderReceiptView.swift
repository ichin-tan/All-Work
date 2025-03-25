//
//  OrderReceiptView.swift
//  Chintan_PRINT
//
//  Created by CP on 05/02/25.
//

import SwiftUI

struct OrderReceiptView: View {
    
    var order: Order
    
    var body: some View {
        VStack {
            
            Form {
                Section(header:
                            Text("Recept Section")
                    .foregroundColor(.black)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .padding([.bottom, .top], 15)
                ) {
                    
                    ZStack {
                        Rectangle()
                            .foregroundColor(Color.init(red: 224/255, green: 175/255, blue: 160/255))
                        
                        VStack(spacing: 10) {
                            Text("Phone Number: \(order.customerPhoneNumber)")
                                .padding(.top, 10)
                            Text("Print Type: \(order.printType)")
                            Text("Print Size: \(order.printSize)")
                            Text("Quantity: \(order.quantity)")
                            
                            if(!order.orderDiscountCode.isEmpty) {
                                Text("Discount Code: \(order.orderDiscountCode)")
                                Text("Discount: $\(String(format: "%.2f", order.getDiscount(on: order.getTotalAmount())))")
                            }
                            
                            if(order.isDeliverySelected) {
                                Text("Delivery Selected: Yes (+$5.99)")
                            } else {
                                Text("Delivery Selected: No")
                            }
                            
                            Text("Total Tax (13%): $\(String(format: "%.2f", order.getTax(on: order.getOrderAmount() - order.getDiscount(on: order.getOrderAmount()))))")
                            Text("Final Cost: $\(String(format: "%.2f", order.getTotalAmount()))")
                                .padding(.bottom, 10)
                        }
                    }
                }
                .listRowInsets(EdgeInsets())
            }
            .cornerRadius(20)
        }
        .padding()
        .background(Color.init(red: 39/255, green: 71/255, blue: 110/255))
        .navigationTitle("Receipt Screen")
    }}

#Preview {
    OrderReceiptView(order: Order())
}
