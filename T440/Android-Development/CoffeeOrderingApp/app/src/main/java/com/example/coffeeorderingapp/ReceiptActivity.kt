package com.example.coffeeorderingapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.coffeeorderingapp.databinding.ActivityReceiptBinding

class ReceiptActivity : AppCompatActivity() {

    lateinit var binding: ActivityReceiptBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityReceiptBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }

}