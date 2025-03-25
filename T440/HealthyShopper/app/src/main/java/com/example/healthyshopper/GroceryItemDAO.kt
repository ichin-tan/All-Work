package com.example.healthyshopper

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Dao
interface GroceryItemDao {

    @Query("SELECT * FROM grocery_items")
    fun getAllGroceryItems(): Flow<List<GroceryItem>>

    @Insert
    suspend fun insert(groceryItem: GroceryItem)

    @Update
    suspend fun update(groceryItem: GroceryItem)

    @Delete
    suspend fun delete(groceryItem: GroceryItem)
}