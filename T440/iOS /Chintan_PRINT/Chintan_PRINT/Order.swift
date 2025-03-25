//
//  Order.swift
//  Chintan_PRINT
//
//  Created by CP on 05/02/25.
//

import Foundation

class Order: Identifiable, ObservableObject {
    let id = UUID()
    @Published var printType: String = "Photo"
    @Published var printSize: String = "4x6"
    @Published var quantity: Int = 1
    @Published var customerPhoneNumber: String = ""
    @Published var orderDiscountCode: String = ""
    var isDeliverySelected: Bool = false
    
    private var errorMessage = ""
    
    func getPrintSizes() -> [String] {
        if(self.printType == "Photo") {
            return ["4x6", "6x8", "8x12"]
        } else {
            return ["12x16", "16x20", "18x24"]
        }
    }
    
    func getQuantityRange() -> ClosedRange<Int> {
        if(self.printType == "Photo") {
            return 1...10
        } else {
            return 3...10
        }
    }
    
    func isValidOrder() -> Bool {
        if(customerPhoneNumber.isEmpty) {
            errorMessage = "Phone number can not be empty!"
            return false
        } else if (orderDiscountCode.isEmpty) {
            return true
        } else if (!orderDiscountCode.hasPrefix("PRINT")) {
            errorMessage = "Invalid discount code!"
            self.orderDiscountCode = ""
            return false
        } else {
            return true
        }
    }
    
    func getErrorMessage() -> String {
        return errorMessage
    }
    
    func resetOrder() {
        self.printType = "Photo"
        self.printSize = "4x6"
        self.quantity = 1
        self.customerPhoneNumber = ""
        self.orderDiscountCode = ""
        self.isDeliverySelected = false
        self.errorMessage = ""
    }
    
    func getOrderAmount() -> Double {
        var orderAmount = 0.0
        let quantity = Double(self.quantity)
        
        switch(self.printType) {
        case "Photo":
            
            switch(self.printSize) {
            case "4x6":
                orderAmount = (quantity * 6.99)
            case "6x8":
                orderAmount = (quantity * 8.99)
            case "8x12":
                orderAmount = (quantity * 10.99)
            default:
                print("Invalid Size")
            }
            
        case "Canvas":
            
            switch(self.printSize) {
            case "12x16":
                orderAmount = (quantity * 14.99)
            case "16x20":
                orderAmount = (quantity * 18.99)
            case "18x24":
                orderAmount = (quantity * 22.99)
            default:
                print("Invalid Size")
            }

        default:
            print("Invalid Type")
        }
        
        return orderAmount
    }
    
    func getDiscount(on price: Double) -> Double {
        if(!self.orderDiscountCode.isEmpty) {
                        
            var discount = price * 0.3
            
            if (discount > 15) {
                discount = 15
            }
            
            return discount

        }
        return 0.0
    }
    
    func getTax(on price: Double) -> Double {
        return price * 0.13
    }
        
    func getTotalAmount() -> Double {
        
        var totalPrice = self.getOrderAmount()
        
        let discount = self.getDiscount(on: totalPrice)
        totalPrice -= discount
        
        let tax = self.getTax(on: totalPrice)
        totalPrice += tax
        
        if(self.isDeliverySelected) {
            totalPrice += 5.99
        }
        
        return totalPrice
    }
    
}
