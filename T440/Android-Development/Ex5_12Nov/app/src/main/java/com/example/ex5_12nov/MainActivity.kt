package com.example.ex5_12nov

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.ex5_12nov.databinding.ActivityMainBinding
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken

class MainActivity : AppCompatActivity() {

    // Declare binding variable for View Binding
    private lateinit var binding: ActivityMainBinding

    // SharedPreferences key
    private val sharedPrefFile = "com.example.ex5_12nov.PREFERENCES"

    // Gson instance for serialization
    private val gson = Gson()

    // Key for storing the list in SharedPreferences
    private val listKey = "USER_LIST"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize SharedPreferences
        val sharedPreferences = getSharedPreferences(sharedPrefFile, Context.MODE_PRIVATE)

        // Button to add a name to the list and save it in SharedPreferences
        binding.buttonAddName.setOnClickListener {
            val name = binding.editTextName.text.toString()
            if (name.isNotBlank()) {
                // Retrieve the existing list or create a new one
                val currentList = getListFromPreferences(sharedPreferences).toMutableList()
                currentList.add(name)

                // Save the updated list to SharedPreferences
                saveListToPreferences(sharedPreferences, currentList)
                binding.textViewList.text = "Name added: $name"
                binding.editTextName.text.clear()
            } else {
                binding.textViewList.text = "Please enter a name."
            }
        }

        // Button to show the list from SharedPreferences
        binding.buttonShowList.setOnClickListener {
            val currentList = getListFromPreferences(sharedPreferences)
            binding.textViewList.text = if (currentList.isNotEmpty()) {
                "List of names:\n${currentList.joinToString("\n")}"
            } else {
                "No names saved."
            }
        }
    }

    private fun getListFromPreferences(sharedPreferences: SharedPreferences): List<String> {
        val json = sharedPreferences.getString(listKey, null)
        return if (json != null) {
            val type = object : TypeToken<List<String>>() {}.type
            gson.fromJson(json, type)
        } else {
            emptyList()
        }
    }

    // Function to save a list to SharedPreferences
    private fun saveListToPreferences(sharedPreferences: SharedPreferences, list: List<String>) {
        val json = gson.toJson(list)
        with(sharedPreferences.edit()) {
            putString(listKey, json)
            apply()
        }
    }
}
