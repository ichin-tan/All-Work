package com.example.healthyshopper

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.healthyshopper.databinding.ActivityMainBinding
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val groceryItemViewModel: GroceryItemViewModel by viewModels {
        GroceryItemViewModelFactory((application as GroceryItemApplication).repository)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)

        setContentView(binding.root)

        // Set click listener
        binding.btnAddItem.setOnClickListener {
            val itemName = binding.etGroceryItem.text.toString()
            if (itemName.isNotBlank()) {
                lifecycleScope.launch {
                    groceryItemViewModel.insert(GroceryItem(itemName = itemName))
                    binding.etGroceryItem.text.clear()
                }
            }
        }

        // Observe the grocery items and update the TextView
        groceryItemViewModel.allGroceryItems.observe(this) { items ->
            val groceryList = items.joinToString("\n") { it.itemName }
            binding.tvGroceryList.text = groceryList
        }
    }
}
