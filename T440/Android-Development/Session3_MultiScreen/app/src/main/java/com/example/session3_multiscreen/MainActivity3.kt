package com.example.session3_multiscreen

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.session3_multiscreen.databinding.ActivityMain3Binding

class MainActivity3 : AppCompatActivity() {
    // properties
    lateinit var binding: ActivityMain3Binding

    // similar to a fun main()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMain3Binding.inflate(layoutInflater)
        setContentView(binding.root)

        binding.btnGoBack.setOnClickListener{
            finish()
        }
    }
}