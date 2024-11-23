class MovieTheatre {
    var name:String
    var ticketPrice:Double = 14.75
    var hasRestaurant:Boolean
    var movies:MutableList<String>


    constructor(n:String, r:Boolean, m:MutableList<String>) {
        name = n
        hasRestaurant = r
        movies = m
    }
}


fun main() {
    // t1 has an empty list of movies
    val t1:MovieTheatre = MovieTheatre("Toronto VIP Theatre", false, mutableListOf())
    println("Theatre1: ${t1.name} -  ${t1.ticketPrice}  - ${t1.hasRestaurant}")
    println("How many movies are playing? ${t1.movies.size}")


    val t2:MovieTheatre = MovieTheatre("GBC Theatre", true, mutableListOf("Spiderman: Into the Spiderverse", "Joker Movie", "The Barbie Movie"))
    println("Theatre2: ${t2.name} -  ${t2.ticketPrice}  - ${t2.hasRestaurant}")
    println("How many movies are playing? ${t2.movies.size}")


    // modify the name of the Joker movie
    println("Which movies are playing at theatre 2?")
    println(t2.movies)
    t2.movies[1] = "Joker: Folie à Deux"
    println(t2.movies)


    t2.movies.removeAt(0)
    println(t2.movies)


    t2.movies.add("Pokemon Movie")
    println(t2.movies)
}
