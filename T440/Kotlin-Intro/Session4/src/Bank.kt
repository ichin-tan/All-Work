class Bank {
    var name : String
    var address : String
    var bankAccounts: List<BankAccount>

    constructor(n: String, a: String, ba: List<BankAccount>) {
        name = n
        address = a
        bankAccounts = ba
    }
}

class BankAccount {
    var accountBalance : Double
    var customer: Customer

    constructor(b: Double, c: Customer) {
        accountBalance = b
        customer = c
    }


}

class Customer {
    var name: String
    var email: String

    constructor(n: String, e: String) {
        name = n
        email = e
    }
}

fun main() {

}