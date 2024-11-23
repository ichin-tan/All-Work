package com.example.session03

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.session03.databinding.ActivityMainBinding
import com.google.android.material.snackbar.Snackbar

class MainActivity : AppCompatActivity() {

    // properties
    lateinit var binding: ActivityMainBinding


    // similar to a fun main()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)


        binding.btnShowSnackbar.setOnClickListener {
            // 1.5 seconds
            val snackbar = Snackbar.make(binding.root, "HELLO WORLD 1!", Snackbar.LENGTH_SHORT)
            snackbar.show()
        }
        binding.btnShowSnackbar2.setOnClickListener {
            // 2.750 seconds
            val snackbar = Snackbar.make(binding.root, "HELLO WORLD 2!", Snackbar.LENGTH_LONG)
            snackbar.show()
        }
        binding.btnShowSnackbar3.setOnClickListener {
            // show forever
            val snackbar = Snackbar.make(binding.root, "HELLO WORLD 3!", Snackbar.LENGTH_INDEFINITE)
            snackbar.show()
        }
    }
}



