
// One to One
class Person {
    var name: String
    var age: Int
    var dog: Dog
    var car: Car

    constructor(n: String, a: Int, d: Dog, c: Car) {
        name = n
        age = a
        dog = d
        car = c
    }
    fun parkCar() {
        println("Car is parked, speed is 0")
        car.speed = 0
    }
}

class Dog {
    var name: String
    var breed: String

    constructor(n: String, b: String) {
        name = n
        breed = b
    }
}

class Car {
    var licencePlate: String
    var speed: Int

    constructor(l: String, s: Int) {
        licencePlate = l
        speed = s
    }
}

fun main() {
    val p1:Person = Person("Abby", 29, Dog("Rover", "Poodle"), Car("ABC000", 30))
    // output p1's details
    println("${p1.name}, ${p1.age}, Dog - ${p1.dog.name}, ${p1.dog.breed}, Car - ${p1.car.licencePlate}, ${p1.car.speed}")
    val p2:Person = Person("Bobby", 55, Dog("Kylo", "Golden Retriever"), Car("XYZ000", 50))
    println("${p2.name}, ${p2.age}, Dog - ${p2.dog.name}, ${p2.dog.breed}, Car - ${p2.car.licencePlate}, ${p2.car.speed}")
    p2.parkCar()
    println("${p2.name}, ${p2.age}, Dog - ${p2.dog.name}, ${p2.dog.breed}, Car - ${p2.car.licencePlate}, ${p2.car.speed}")
}