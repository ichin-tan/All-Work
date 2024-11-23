// Base Product class
open class Product(
    val id: String,
    val name: String,
    open val price: Double
) {
    open fun calculateTax(): Double {
        return price * 0.1 // Basic 10% tax
    }

    open fun display() {
        println("Product: $name - $${price}")
    }
}
// Digital Product
class DigitalProduct(
    id: String,
    name: String,
    price: Double,
    val downloadSize: Double
) : Product(id, name, price) {
    override fun calculateTax(): Double {
        return price * 0.05 // Digital goods taxed at 5%
    }

    override fun display() {
        println("Digital Product: $name - $${price.format()} (${downloadSize}GB)")
    }
}

// Physical Product
class PhysicalProduct(
    id: String,
    name: String,
    price: Double,
    val weight: Double,
    val dimensions: String
) : Product(id, name, price) {
    override fun calculateTax(): Double {
        return price * 0.15 // Physical goods taxed at 15%
    }

    override fun display() {
        println("Physical Product: $name - $${price.format()} (${weight}kg)")
    }

    // Overloaded method for shipping calculation
    fun calculateShipping(distance: Int): Double {
        return weight * 0.1 * distance
    }

    fun calculateShipping(distance: Int, express: Boolean): Double {
        val baseShipping = calculateShipping(distance)
        return if (express) baseShipping * 1.5 else baseShipping
    }
}

// Subscription Product
class SubscriptionProduct(
    id: String,
    name: String,
    private val monthFees: Double,
    private val totalMonths: Int
) : Product(id, name, 0.0) {

    override val price: Double
        get() = monthFees * totalMonths

    override fun calculateTax(): Double {
        return price * 0.08 // Subscription goods taxed at 8%
    }

    override fun display() {
        println("Subscription: $name - $${monthFees.format()}/month for $totalMonths months (Total: $${price.format()})")
    }
}

// Shopping Cart demonstrating polymorphism
class ShoppingCart {
    private val items = mutableListOf<Product>()

    fun addItem(product: Product) {
        items.add(product)
    }

    fun removeItem(product: Product) {
        items.remove(product)
    }

    fun calculateTotal(): Double {
        return items.sumOf { it.price + it.calculateTax() }
    }

    fun calculateTotalTax(): Double {
        return items.sumOf { it.calculateTax() }
    }

    fun displayCart() {
        if (items.isEmpty()) {
            println("Shopping Cart is empty")
            return
        }

        println("\nShopping Cart Contents:")
        println("----------------------")
        items.forEach { it.display() }
        println("----------------------")
        println("Subtotal: $${items.sumOf { it.price }.format()}")
        println("Total Tax: $${calculateTotalTax().format()}")
        println("Final Total: $${calculateTotal().format()}")
    }
}

// Extension function to format currency
fun Double.format(): String = String.format("%.2f", this)

// Order processor to demonstrate polymorphic handling
class OrderProcessor {
    fun processOrder(cart: ShoppingCart, shippingAddress: String? = null) {
        println("\nProcessing Order:")
        println("----------------")
        cart.displayCart()

        if (shippingAddress != null) {
            println("\nShipping to: $shippingAddress")
        }

        println("\nOrder processed successfully!")
    }
}

fun main() {
    println("E-Commerce System Demonstration")
    println("==============================")

    // Create sample products
    val ebook = DigitalProduct("D1", "Programming Kotlin", 29.99, 2.5)
    val physicalBook = PhysicalProduct("P1", "Kotlin in Action", 49.99, 0.8, "24x18x3cm")
    val laptop = PhysicalProduct("P2", "MacBook Pro", 1299.99, 2.1, "31x22x1.5cm")
    val streaming = SubscriptionProduct("S1", "Video Streaming", 14.99, 12)
    val software = SubscriptionProduct("S2", "Cloud Storage", 9.99, 6)

    // Create shopping cart
    val cart = ShoppingCart()

    // Demonstration 1: Adding items and displaying cart
    println("\nAdding items to cart...")
    cart.addItem(ebook)
    cart.addItem(physicalBook)
    cart.displayCart()

    // Demonstration 2: Calculating shipping for physical items
    println("\nShipping Calculations:")
    println("Standard shipping for '${physicalBook.name}': $${physicalBook.calculateShipping(100).format()}")
    println("Express shipping for '${physicalBook.name}': $${physicalBook.calculateShipping(100, true).format()}")

    // Demonstration 3: Adding subscription products
    println("\nAdding subscription products...")
    cart.addItem(streaming)
    cart.addItem(software)
    cart.displayCart()

    // Demonstration 4: Order processing
    val orderProcessor = OrderProcessor()
    orderProcessor.processOrder(cart, "123 Main St, Anytown, USA")

    // Demonstration 5: Creating a digital-only cart
    println("\nCreating a digital-only cart...")
    val digitalCart = ShoppingCart()
    digitalCart.addItem(ebook)
    digitalCart.addItem(streaming)
    digitalCart.addItem(software)

    println("\nProcessing digital order...")
    orderProcessor.processOrder(digitalCart)

    // Demonstration 6: Polymorphic type checking
    println("\nAnalyzing cart contents:")
    val allProducts = listOf(ebook, physicalBook, laptop, streaming, software)

    println("\nProduct Analysis:")
    allProducts.forEach { product ->
        when (product) {
            is DigitalProduct -> println("Digital - ${product.name} (${product.downloadSize}GB)")
            is PhysicalProduct -> println("Physical - ${product.name} (${product.weight}kg)")
            is SubscriptionProduct -> println("Subscription - ${product.name}")
            else -> println("Unknown product type")
        }
    }
}

sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) {
    when (result) {
        is Result.Success -> println("Success: ${result.data}")
        is Result.Error -> println("Error: ${result.message}")
        is Result.Loading -> println("Loading...")
        // No 'else' needed - compiler knows all possibilities
    }
}