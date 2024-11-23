import kotlin.math.cos

class PrestoCard {
    var balance: Double
    var monthlyPass: Boolean = false

    constructor(balance: Double) {
        this.balance = balance
    }
}

class Customer {
    var name: String
    var isStudent: Boolean
    var card: PrestoCard

    constructor(name: String, isStudent: Boolean) {
        this.name = name
        this.isStudent = isStudent

        if(this.isStudent) {
            this.card = PrestoCard(20.0)
        } else {
            this.card = PrestoCard(0.0)
        }
    }

    fun addMoney(amount: Double) {
        this.card.balance += amount
        println("$${amount} added to ${this.name}'s presto card. Available balance : $${this.card.balance}")
    }

    fun buyPass() {
        if(this.card.monthlyPass == true) {
            println("ERROR! ${this.name}'s card already has a monthly pass")
        } else {
            val monthlyPassCost = 156.00
            val discountedMonthlyPassCost = monthlyPassCost - (monthlyPassCost * 0.15)
            var cost = 0.0
            if(this.isStudent == true) {
                cost = discountedMonthlyPassCost
            } else {
                cost = monthlyPassCost
            }
            if(this.card.balance >= cost) {
                this.card.balance -= cost
                this.card.monthlyPass = true
                println("${this.name} has bought monthly pass for $${cost}. Available balance : $${this.card.balance}")
            } else {
                println("ERROR! ${this.name} doesn't have enough money to buy a monthly pass for his presto card")
            }
        }
    }

    fun rideBus() {
        var canRideBus = false
        val busFare = 3.30
        if(this.card.monthlyPass == true) {
            canRideBus = true
        } else {
            if (this.card.balance >= 3.30) {
                canRideBus = true
                this.card.balance -= busFare
            }
        }
        if(canRideBus == true) {
            println("${this.name} is riding the bus. Available balance : $${this.card.balance}")
        } else {
            println("ERROR! ${this.name} can not ride a bus as the card has neither a monthly pass nor enough amount for bus fare")
        }
    }
}

fun main() {
    println("-----------------------------------------------------------------------------------------------")

    // Test case 1
    val customer1 = Customer("Chintan", false)
    customer1.rideBus()
    customer1.addMoney(3.30)
    customer1.rideBus()
    println("-----------------------------------------------------------------------------------------------")

    // Test case 2
    val customer2 = Customer("Riddhi", true)
    customer2.addMoney(300.0)
    customer2.buyPass()
    customer2.buyPass()
    customer2.rideBus()
}