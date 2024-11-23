package com.example.listsofdatademo

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import com.example.listsofdatademo.databinding.BookRowLayoutBinding

// TODO: Write the code for the BookAdapter here
class BookArrayAdapter(context: Context, private val items: List<Book>) : ArrayAdapter<Book>(context, 0, items) {

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val binding: BookRowLayoutBinding

        if (convertView == null) {
            binding = BookRowLayoutBinding.inflate(LayoutInflater.from(context), parent, false)
        } else {
            binding = BookRowLayoutBinding.bind(convertView)
        }

        // Get the current item
        val item = this.getItem(position)!!

        // Bind data to views
        binding.tvTitle.text = item.title
        binding.tvAuthor.text = item.author

        return binding.root
    }


    override fun getDropDownView(position: Int, convertView: View?, parent: ViewGroup): View {
        return getView(position, convertView, parent)
    }
}
