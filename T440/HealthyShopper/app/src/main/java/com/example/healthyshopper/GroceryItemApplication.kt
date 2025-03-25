package com.example.healthyshopper

import android.app.Application

class GroceryItemApplication : Application() {
    val database by lazy { GroceryItemDatabase.getDatabase(this) }
    val repository by lazy { GroceryItemRepository(database.groceryItemDao()) }
}