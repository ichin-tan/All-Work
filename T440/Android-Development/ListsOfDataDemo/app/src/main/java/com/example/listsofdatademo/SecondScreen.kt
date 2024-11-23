package com.example.listsofdatademo

import android.os.Bundle
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.example.listsofdatademo.databinding.ActivitySecondScreenBinding

class SecondScreen : AppCompatActivity() {

    lateinit var binding:ActivitySecondScreenBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivitySecondScreenBinding.inflate(layoutInflater)
        setContentView(binding.root)


        // TODO: Intent code here

    }
}