enum class BillType {
    HYDRO_BILL, INTERNET_BILL, MOBILE_BILL
}
open class Bill: CanBeDisplayed {
    var id:String
    var date:String
    var type:BillType
    var total:Double

    constructor(id: String, date: String, type: BillType, total: Double) {
        this.id = id
        this.date = date
        this.type = type
        this.total = total
    }

    override fun display() {
        println("Displaying Bill class")
    }
}

class Hydro:Bill {
    var agencyName:String
    var usage:Int           // 34 hours of electricty

//    constructor(i:String, d:String, bt:BillType, tot:Double, agency:String, hours:Int)
//    : super(i, d, bt, tot)
//    {
//        this.agencyName = agency
//        this.usage = hours
//    }

    constructor(i:String, d:String, tot:Double, agency:String, hours:Int)
            : super(i, d, BillType.HYDRO_BILL, tot)
    {
        this.agencyName = agency
        this.usage = hours
    }
}

class Internet:Bill {
    constructor(i:String, d:String, t:Double):super(i, d, BillType.INTERNET_BILL, t) {
        // nothing!
    }
}

class Mobile:Bill {
    var planName:String
    var phoneNumber:String
    var minutes:Int

    constructor(i:String, d:String, t:Double, plan:String, phone:String, min:Int)
            :super(i, d, BillType.MOBILE_BILL, t) {
        this.planName = plan
        this.phoneNumber = phone
        this.minutes = min
    }
}

class Customer: CanBeDisplayed {
    var name: String
    var bills: MutableList<Bill>

    constructor(name:String, bills: MutableList<Bill>) {
        this.name = name
        this.bills = bills
    }

    fun calculateTotal(): Double {
        var total = 0.0
        for(bill in this.bills) {
            total += bill.total
        }
        return total
    }

    override fun display() {
        println("Displaying customer class")
    }
}

interface CanBeDisplayed {
    fun display()
}

fun main() {
    val h1:Hydro = Hydro("HYD101", "Oct 31", 99.50, "Toronto Hydro", 25)
    val h2:Hydro = Hydro("HYD102", "Nov 01", 35.1, "Ottawa Hydro", 31)
    val h3:Hydro = Hydro("HYD103", "Nov 05", 1.00, "Kingston Hydro", 100)
    val m1: Mobile = Mobile("MOB123", "Oct 1", 300.0,"Plan123","1234321234",20)

    val c1 = Customer("Chintan", mutableListOf(h1,h2,h3,m1))
    println(c1.calculateTotal())

    c1.display()
    h1.display()
}
