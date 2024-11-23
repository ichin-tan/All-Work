import java.io.Serializable

enum class MilkType {
    NONE, SOY, ALMOND
}

class Order:Serializable {
    var quantity:Int
    var milkChoice:MilkType
    var subtotal:Double
    var tax:Double
    var total:Double

    // option 1: create a constructor that calculates the subtotal, tax, total
    constructor(quantity: Int, milkChoice: MilkType) {
        this.quantity = quantity
        this.milkChoice = milkChoice

        // get the price of milk
        var milkPrice:Double = 0.0
        if (milkChoice == MilkType.NONE) {
            milkPrice = 0.0
        } else if (milkChoice == MilkType.SOY) {
            milkPrice = 1.50
        } else if (milkChoice == MilkType.ALMOND) {
            milkPrice = 2.00
        }

        // price of one coffee
        val coffeePrice:Double = 2.00 + milkPrice

        // subtotal
        this.subtotal = quantity * coffeePrice

        // tax
        this.tax = subtotal * 0.10

        // final total
        this.total = subtotal + tax
    }

    // option 2:  Create a constructor that sets all values
    constructor(quantity: Int, milkChoice: MilkType, subtotal: Double, tax: Double, total: Double) {
        this.quantity = quantity
        this.milkChoice = milkChoice
        this.subtotal = subtotal
        this.tax = tax
        this.total = total
    }

    override fun toString(): String {
        return "Order(quantity=$quantity, milkChoice=$milkChoice, subtotal=$subtotal, tax=$tax, total=$total)"
    }
}

