package com.example.room_demo

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "items") // Defines the table name as "items"
data class ItemEntity(
    @PrimaryKey(autoGenerate = true) val id: Int = 0, // Auto-generated primary key
    val name: String // Column for the item's name
)