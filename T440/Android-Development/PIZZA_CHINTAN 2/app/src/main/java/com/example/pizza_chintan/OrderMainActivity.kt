package com.example.pizza_chintan

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.pizza_chintan.databinding.ActivityOrderMainBinding
import com.google.android.material.snackbar.Snackbar

enum class PizzaType {
    MEAT, VEGETARIAN
}

class OrderMainActivity : AppCompatActivity() {
    lateinit var binding: ActivityOrderMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityOrderMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // By default I am selecting vegetarian pizza so that user cant submit without selecting one
        binding.rbVegetarian.isChecked = true

        // Switch entire pizza listener
        binding.switchEntirePizza.setOnCheckedChangeListener { _, switchValue:Boolean ->
            if(switchValue == true) {
                binding.etSlices.setText("8")
            } else {
                binding.etSlices.setText("0")
            }
        }

        // Button submit on click listener
        binding.btnSubmit.setOnClickListener {
            var pizzaType: PizzaType = PizzaType.VEGETARIAN
            if(binding.rbMeat.isChecked) {
                pizzaType = PizzaType.MEAT
            }
            val numberOfSlices = binding.etSlices.text.toString().toInt()
            val needsDelivery = binding.switchDelivery.isChecked

            if (numberOfSlices === 0) {
                val snackbar = Snackbar.make(binding.root, "ERROR: Number of slices cannot be 0", Snackbar.LENGTH_LONG)
                snackbar.show()
            } else if (numberOfSlices > 8){
                val snackbar = Snackbar.make(binding.root, "ERROR: Number of slices cannot be greater than 8", Snackbar.LENGTH_LONG)
                snackbar.show()
            } else {
                var pizzaOrder = PizzaOrder(numberOfSlices, needsDelivery, pizzaType)

                val intent: Intent = Intent(this@OrderMainActivity, ReceiptMainActivity::class.java)
                intent.putExtra("PIZZA_ORDER", pizzaOrder)
                startActivity(intent)
            }
        }
    }
}