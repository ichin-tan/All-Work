package com.example.listsofdatademo

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import com.example.listsofdatademo.databinding.BookRowLayoutBinding
import com.example.listsofdatademo.databinding.CountryRowLayoutBinding

// TODO: Write the code for the BookAdapter here
class CountryAdapter(context: Context, private val items: List<Country>) : ArrayAdapter<Country>(context, 0, items) {


    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val binding: CountryRowLayoutBinding

        println("Get view executing for ${position} - ${this.getItem(position)!!.name}")

        if (convertView == null) {
            binding = CountryRowLayoutBinding.inflate(LayoutInflater.from(context), parent, false)
        } else {
            binding = CountryRowLayoutBinding.bind(convertView)
        }

        // Get the current item
        val country = this.getItem(position)!!

        // Bind data to views
        binding.tvName.text = "${country.name} - ${country.capital}"
        binding.tvCapital.text = "${country.population}"
        binding.switchCountry.isChecked = country.population > 700

        return binding.root
    }


    override fun getDropDownView(position: Int, convertView: View?, parent: ViewGroup): View {
        return getView(position, convertView, parent)
    }
}
