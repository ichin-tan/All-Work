package com.example.proj12nov_1

import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.proj12nov_1.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    // Declare binding variable for View Binding
    private lateinit var binding: ActivityMainBinding

    // SharedPreferences key
    private val sharedPrefFile = "com.example.proj12nov_1.PREFERENCES"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize SharedPreferences
        val sharedPreferences = getSharedPreferences(sharedPrefFile, Context.MODE_PRIVATE)

        // Set up button to save the name to SharedPreferences
        binding.buttonSave.setOnClickListener {
            val name = binding.editTextName.text.toString()
            if (name.isNotBlank()) {
                with(sharedPreferences.edit()) {
                    putString("USER_NAME", name)
                    apply()
                }
                binding.textViewDisplay.text = "Name saved!"
            } else {
                binding.textViewDisplay.text = "Please enter a name."
            }
        }

        // Set up button to retrieve and display the name from SharedPreferences
        binding.buttonRetrieve.setOnClickListener {
            val savedName = sharedPreferences.getString("USER_NAME", "No name saved")
            binding.textViewDisplay.text = "Stored Name: $savedName"
        }
    }
}
