package com.example.healthyshopper

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.asLiveData
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch

class GroceryItemViewModel(private val repository: GroceryItemRepository) : ViewModel() {

    val allGroceryItems: LiveData<List<GroceryItem>> = repository.allGroceryItems.asLiveData()

    fun insert(groceryItem: GroceryItem) = viewModelScope.launch {
        repository.insert(groceryItem)
    }

    // Add other ViewModel functions for update and delete as needed
}

class GroceryItemViewModelFactory(private val repository: GroceryItemRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(GroceryItemViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return GroceryItemViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}