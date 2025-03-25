package com.example.room_demo

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.room_demo.databinding.ActivityMainBinding
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var database: AppDatabase
    private lateinit var itemDao: ItemDao

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        database = AppDatabase.getInstance(this)
        itemDao = database.itemDao()

        binding.btnAddItem.setOnClickListener { addItem() }
        binding.btnShowItems.setOnClickListener { showItems() }
    }

    private fun addItem() {
        val itemName = binding.etItemName.text.toString()
        if (itemName.isNotBlank()) {
            lifecycleScope.launch {
                itemDao.insertItem(ItemEntity(name = itemName))
                Toast.makeText(this@MainActivity, "Item added!", Toast.LENGTH_SHORT).show()
            }
        } else {
            Toast.makeText(this, "Please enter an item name.", Toast.LENGTH_SHORT).show()
        }
    }

    private fun showItems() {
        lifecycleScope.launch {
            itemDao.getAllItems().collect { items ->
                binding.tvItems.text = items.joinToString("\n") { item -> item.name }
            }
        }
    }
}