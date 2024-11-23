package com.example.crud_sharedpref_12nov

import android.content.Context
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.crud_sharedpref_12nov.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    // Declare binding variable for View Binding
    private lateinit var binding: ActivityMainBinding

    // SharedPreferences key
    private val sharedPrefFile = "com.example.crud_sharedpref_12nov.PREFERENCES"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize SharedPreferences
        val sharedPreferences = getSharedPreferences(sharedPrefFile, Context.MODE_PRIVATE)

        // Save or update the value
        binding.buttonSave.setOnClickListener {
            val name = binding.editTextName.text.toString()
            if (name.isNotBlank()) {
                with(sharedPreferences.edit()) {
                    putString("USER_NAME", name)
                    apply()
                }
                binding.textViewDisplay.text = "Name saved/updated successfully!"
            } else {
                binding.textViewDisplay.text = "Please enter a name to save."
            }
        }

        // Retrieve the value
        binding.buttonRetrieve.setOnClickListener {
            val savedName = sharedPreferences.getString("USER_NAME", "No name saved")
            binding.textViewDisplay.text = "Stored Name: $savedName"
        }

        // Delete the value
        binding.buttonDelete.setOnClickListener {
            if (sharedPreferences.contains("USER_NAME")) {
                with(sharedPreferences.edit()) {
                    remove("USER_NAME")
                    apply()
                }
                binding.textViewDisplay.text = "Name deleted successfully!"
            } else {
                binding.textViewDisplay.text = "No name found to delete."
            }
        }
    }
}
