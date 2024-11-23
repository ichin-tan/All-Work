package com.example.movierating

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.movierating.databinding.ActivityMainBinding

class Movie {
    var name:String
    var starRating:Int


    constructor(name: String, starRating: Int) {
        this.name = name
        this.starRating = starRating
    }

    override fun toString(): String {
        return "Name: ${this.name} - Rating: ${this.starRating}"
    }
}

class MainActivity : AppCompatActivity() {

    // properties
    lateinit var binding: ActivityMainBinding

    // The screen has a list of movies
    var moviesList:MutableList<Movie> = mutableListOf()

    // similar to a fun main()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // tells the MainActivity.kt that its xml file is activity_main.xml
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // TODO: add a movie
        binding.btnAdd.setOnClickListener {
            // 1. Create a movie object based on what was entered in the form fields
            val movieNameFromUI:String = binding.etName.text.toString()
            // .rating = a float, but our movie class expects this to be an int
            // so we did a conversion here
            val ratingFromUI:Int = binding.ratingBar.rating.toInt()

            var m1:Movie = Movie(movieNameFromUI, ratingFromUI)
            // 2. Add the movie object to the list
            moviesList.add(m1)
            // 3. Output a success message and clear the textboxes to prepare for new input
            binding.tvResults.setText("Movie added!")
            binding.etName.setText("")
            binding.ratingBar.rating = 0f       // resetting the star rating to 0
        }

        // TODO: Get a  movies
        binding.btnGetAll.setOnClickListener {
            // 1. Loop through all movies and calculate the average rating
            var sum:Double = 0.0
            for (item in moviesList) {
                sum = sum + item.starRating
            }
            val avg: Double = sum / moviesList.count()
            // 2. Output all movies & the average to the screen
            var output:String = ""
            for (item in moviesList) {
                output += "${item.toString()}\n"
            }
            output += "Average Rating: ${avg}"
            binding.tvResults.setText(output)
        }
    }
}
