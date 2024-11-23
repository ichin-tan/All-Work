data class Country(var name: String, var capital: String, var population: Int)

data class Passport(var name: String, var passportNo: String, var issuingCountry: Country)

fun main() {
    var canada = Country("Canada", "Ottawa", 50000000)
    var p1 = Passport("Chintan","ABC21223133", canada)
    println(canada)
    println(p1)
}