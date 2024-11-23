package com.example.session3_multiscreen

import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.example.session3_multiscreen.databinding.ActivityMain2Binding


class MainActivity2 : AppCompatActivity() {
    // properties
    lateinit var binding: ActivityMain2Binding

    // similar to a fun main()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMain2Binding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnGoBackToPrevious.setOnClickListener {
            if (intent !== null) {
                val country = intent.getStringExtra("COUNTRY")
                val isFav = intent.getBooleanExtra("IS_FAVORITE",false)
                val pi = intent.getDoubleExtra("PI", 0.0)

                Log.d("","Hello is it coming?")
                Log.d("", "----------------${country} - ${isFav} - ${pi} --------------------")

                val friendsOp = intent.getStringArrayExtra("FRIENDS")
                if(friendsOp !== null) {
                    val friends = friendsOp.toMutableList()
                    Log.d("","${friends}")
                }

                val receivedCar: Car = intent.getSerializableExtra("CAR") as Car
                Log.d("", "${receivedCar}")

                val serializedCars = intent.getSerializableExtra("CARS") as Array<Car>
                val cars : MutableList<Car> = serializedCars.toMutableList()
                Log.d("", "${cars}")
                finish()
            }
        }
    }
}