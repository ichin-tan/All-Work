package com.example.coffeeorderingapp

import MilkType
import Order
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.example.coffeeorderingapp.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    // properties
    lateinit var binding: ActivityMainBinding
    private var quantity = 1

    // similar to a fun main()
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.etQuantity.setText("${quantity}")
        binding.etQuantity.isEnabled = false
        binding.etQuantity.setTextColor(ContextCompat.getColor(this, R.color.black))

        binding.rbNone.isChecked = true

        binding.btnIncrease.setOnClickListener {
            quantity++
            binding.etQuantity.setText("${quantity}")
        }

        binding.btnDecrease.setOnClickListener {
            if(quantity!==1) {
                quantity--
                binding.etQuantity.setText("${quantity}")
            }
        }

        binding.btnSubmit.setOnClickListener {
            //TODO: Navigate to Receipt screen
            val i = Intent(this@MainActivity, ReceiptActivity::class.java)

            // TODO: Get the value from the radio button and populate it into the object
            var milkChoice = MilkType.ALMOND
            val customerOrder:Order = Order(binding.etQuantity.text.toString().toInt(), milkChoice)
            i.putExtra("EXTRA_COFFEE_ORDER", customerOrder)
            startActivity(i)
        }

    }
}