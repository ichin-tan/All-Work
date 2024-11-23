package com.example.pizza_chintan

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.pizza_chintan.databinding.ActivityReceiptMainBinding

class ReceiptMainActivity : AppCompatActivity() {

    lateinit var binding: ActivityReceiptMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityReceiptMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val pizzaOrder = intent.getSerializableExtra("PIZZA_ORDER") as PizzaOrder
        binding.tvResults.setText("${pizzaOrder}")

        binding.btnPlaceAnotherOrder.setOnClickListener {
            finish()
        }
    }
}