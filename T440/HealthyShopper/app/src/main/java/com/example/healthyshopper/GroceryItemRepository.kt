package com.example.healthyshopper

import androidx.annotation.WorkerThread
import kotlinx.coroutines.flow.Flow

class GroceryItemRepository(private val groceryItemDao: GroceryItemDao) {

    val allGroceryItems: Flow<List<GroceryItem>> = groceryItemDao.getAllGroceryItems()

    @Suppress("RedundantSuspendModifier")
    @WorkerThread
    suspend fun insert(groceryItem: GroceryItem) {
        groceryItemDao.insert(groceryItem)
    }

    // Add other repository functions for update and delete as needed
}
