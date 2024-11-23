
class Calculator {
    // Add two numbers
    fun add(a: Int, b: Int): Int {
        return a + b
    }

    // Add three numbers
    fun add(a: Int, b: Int, c: Int): Int {
        return a + b + c
    }

    // Add two doubles
    fun add(a: Double, b: Double): Double {
        return a + b
    }
}

fun main() {
    val calc = Calculator()
    println(calc.add(5, 3))        // Calls first method
    println(calc.add(5, 3, 2))     // Calls second method
    println(calc.add(5.5, 3.2))    // Calls third method
}