enum class MemberType {
    GOLD, REGULAR
}

// I could have used string for service but a service is "a thing" rather than "a string" so used enum.
enum class ServiceNames {
    PRINTING_SERVICES, FURNITURE_RENTAL, ROOM_SERVICES, SPA_SERVICES, CATERING, BREAKFAST, DAILY_ROOM_CLEANING, PET_GROOMING, AUDIO_VIDEO_EQUIPMENTS, TOURIST_ACTIVITY_PLANNING
}

class Customer {
    var name: String
    var memberType: MemberType
    var email: String

    constructor(name: String, memberType: MemberType) {
        this.name = name
        this.memberType = memberType
        this.email = "${this.name}@gmail.com".lowercase()
    }

    override fun toString(): String {
        return "Name: ${this.name}\nEmail: ${this.email}\nMember Type: ${this.memberType}"
    }
}

open class RoomReservation {
    var customer: Customer
    var dailyRate: Double
    var numDays: Int

    constructor(customer: Customer, dailyRate: Double, numDays: Int) {
        this.customer = customer
        this.dailyRate = dailyRate
        this.numDays = numDays
    }

    fun getRoomCost(): Double {
        return (this.dailyRate * this.numDays)
    }

    fun getOccupancyTax(): Double {
        val taxRate = 5.875 / 100
        return (this.getRoomCost() * taxRate)
    }

    open fun getTotal(): Double {
        return (this.getRoomCost() + this.getOccupancyTax())
    }

    open fun printInvoice() {
        println("===================")
        println("===== INVOICE =====")
        println("===================")
        println("---Customer Details---")
        println(this.customer.toString())
        println("---Room Details---")
        println("Daily Rate: $${this.dailyRate}")
        println("Length of Stay: ${this.numDays} days")
        println("Cost: $${this.getRoomCost()}")
        println("Tax (5.875%): $${this.getOccupancyTax()}")
        println("Final Total: $${this.getTotal()}")
    }
}

data class Service(var name: ServiceNames, var cost: Double)

class ConferenceRoomReservation : RoomReservation {
    var eventName: String
    var numAttendees: Int
    var additionalServices: MutableList<Service>

    constructor(customer: Customer, numDays: Int, eventName: String, numAttendees: Int): super(customer, (105.00 * numAttendees), numDays) {
        this.eventName = eventName
        this.numAttendees = numAttendees
        if(customer.memberType === MemberType.REGULAR) {
            this.additionalServices = mutableListOf()
        } else {
            this.additionalServices = mutableListOf(Service(ServiceNames.PRINTING_SERVICES,0.0))
        }
    }

    override fun getTotal(): Double {
        val costWithoutServices = this.getRoomCost() + this.getOccupancyTax()
        var serviceCost = 0.0
        for (service in this.additionalServices) {
            serviceCost += service.cost
        }
        return costWithoutServices + serviceCost
    }

    fun addService(serviceName: ServiceNames, cost: Double) {
        var serviceToAdd = Service(serviceName, cost)
        var isServiceExist = false

        for (service in this.additionalServices) {
            if(service.name === serviceToAdd.name) {
                isServiceExist = true
                break
            }
        }

        if (isServiceExist) {
            println("ERROR! ${serviceToAdd.name} is already available in the reservation!")
        } else {
            this.additionalServices.add(serviceToAdd)
        }
    }

    override fun printInvoice() {
        println("===================")
        println("===== INVOICE =====")
        println("===================")
        println("---Customer Details---")
        println(this.customer.toString())
        println("---Event Details---")
        println("Event Name: ${this.eventName}")
        println("Length: ${this.numDays} days")
        println("Attendees: ${this.numAttendees}")
        println("Daily Rate: $${this.dailyRate}")
        println("Cost: $${this.getRoomCost()}")
        println("Tax (5.875%): $${this.getOccupancyTax()}")
        println("Additional Services")
        for (service in this.additionalServices) {
            println("+ ${service}")
        }
        println("Final Total: $${this.getTotal()}")
    }
}

fun main() {
    //Task a
    var c1 = Customer("Wen", MemberType.REGULAR)
    var c2 = Customer("Janice", MemberType.GOLD)

    //Task b
    var objRoom = RoomReservation(c1, 341.5, 3)
    objRoom.printInvoice()

    //Task c
    var objConfRoom = ConferenceRoomReservation(c2, 2,"Toronto Anime Festival", 7)
    objConfRoom.printInvoice()

    //Task d
    objConfRoom.addService(ServiceNames.CATERING, 1375.99)
    objConfRoom.addService(ServiceNames.AUDIO_VIDEO_EQUIPMENTS, 250.0)
    objConfRoom.addService(ServiceNames.FURNITURE_RENTAL, 310.75)
    // Adding duplicate service // This should fail
    objConfRoom.addService(ServiceNames.FURNITURE_RENTAL, 310.75)
    objConfRoom.printInvoice()

}