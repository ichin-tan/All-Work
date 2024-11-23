package com.example.multiscreen_12nov

import android.content.Context
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.multiscreen_12nov.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    // Declare binding variable for View Binding
    private lateinit var binding: ActivityMainBinding

    // SharedPreferences key
    private val sharedPrefFile = "com.example.multiscreen_12nov.PREFERENCES"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Initialize binding
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Initialize SharedPreferences
        val sharedPreferences = getSharedPreferences(sharedPrefFile, Context.MODE_PRIVATE)

        // Save the value
        binding.buttonSave.setOnClickListener {
            val name = binding.editTextName.text.toString()
            if (name.isNotBlank()) {
                with(sharedPreferences.edit()) {
                    putString("USER_NAME", name)
                    apply()
                }
                binding.editTextName.text.clear()
            }
        }

        // Navigate to the second screen
        binding.buttonGoToSecondScreen.setOnClickListener {
            val intent = Intent(this@MainActivity, SecondActivity::class.java)
            startActivity(intent)
        }
    }
}
