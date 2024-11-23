package com.example.pizza_chintan
import java.io.Serializable

class PizzaOrder: Serializable {
    var confirmationNumber : Int
    var pizzaType : PizzaType
    var numberOfSlices : Int
    var needsDelivery : Boolean
    var subTotal : Double
    var taxAmount : Double
    var total : Double

    constructor(numberOfSlices: Int, needsDelivery: Boolean, pizzaType: PizzaType) {
        this.numberOfSlices = numberOfSlices
        this.needsDelivery = needsDelivery
        this.pizzaType = pizzaType
        this.confirmationNumber = (1000..9999).random()
        this.subTotal = this.numberOfSlices * this.getCostPerSlice() + this.getDeliveryPrice()
        this.taxAmount = (this.subTotal * 13) / 100
        this.total = this.subTotal + this.taxAmount
    }

    fun getCostPerSlice(): Double {
        var costOfSlice: Double = 0.0
        if (this.pizzaType === PizzaType.MEAT) {
            costOfSlice = 6.7
        } else {
            costOfSlice = 4.25
        }
        return costOfSlice
    }

    fun getDeliveryPrice(): Double {
        var deliveryCost : Double = 0.0
        if (this.needsDelivery === true) {
            deliveryCost = 5.25
        }
        return deliveryCost
    }

    override fun toString(): String {
        return "Order Confirmed! Confirmation #: ${this.confirmationNumber}\nYour Receipt:\nPizza Type: ${this.pizzaType}\nNumber of Slices: ${this.numberOfSlices}\nPrice per Slices: ${this.getCostPerSlice()}\nDelivery Cost: ${this.getDeliveryPrice()}\nSubtotal: ${this.subTotal}\nTax (13%): ${this.taxAmount}\nTotal: ${this.total}"
    }
}