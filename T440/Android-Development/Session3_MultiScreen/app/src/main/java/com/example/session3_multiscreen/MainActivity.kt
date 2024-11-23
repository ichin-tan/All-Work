package com.example.session3_multiscreen

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.session3_multiscreen.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    // properties
    lateinit var binding: ActivityMainBinding

    // similar to a fun main()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnGoScreen2.setOnClickListener {
            val intent : Intent = Intent(this@MainActivity, MainActivity2::class.java)
            intent.putExtra("COUNTRY","Canada")
            intent.putExtra("IS_FAVORITE", true)
            intent.putExtra("PI",3.14)

            var listFriends : MutableList<String> = mutableListOf("Chintan", "Riddhi", "Kirtan")
            intent.putExtra("FRIENDS", listFriends.toTypedArray())

            var car : Car = Car("Tesla","TES123")
            intent.putExtra("CAR", car)

            var car1 : Car = Car("Tesla 1","TES111")
            var car2 : Car = Car("Tesla 2","TES222")
            var car3 : Car = Car("Tesla 3","TES333")

            var listCars : MutableList<Car> = mutableListOf(car,car1,car2,car3)
            intent.putExtra("CARS", listCars.toTypedArray())
            startActivity(intent)
        }

        binding.btnGoScreen3.setOnClickListener {
            val intent : Intent = Intent(this@MainActivity, MainActivity3::class.java)
            startActivity(intent)
        }
    }
}