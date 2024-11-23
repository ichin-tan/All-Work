package com.example.multiscreen_12nov

import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.multiscreen_12nov.databinding.ActivitySecondBinding

class SecondActivity : AppCompatActivity() {

    // Declare binding variable for View Binding
    private lateinit var binding: ActivitySecondBinding

    // SharedPreferences key
    private val sharedPrefFile = "com.example.multiscreen_12nov.PREFERENCES"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize binding
        binding = ActivitySecondBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize SharedPreferences
        val sharedPreferences = getSharedPreferences(sharedPrefFile, Context.MODE_PRIVATE)

        // Retrieve and display the stored value
        binding.buttonRetrieve.setOnClickListener {
            val savedName = sharedPreferences.getString("USER_NAME", "No name saved")
            binding.textViewDisplay.text = "Stored Name: $savedName"
        }
    }
}
