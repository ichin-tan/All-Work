package com.example.listsofdatademo


import Student
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.FrameLayout
import android.widget.Spinner
import androidx.appcompat.app.AppCompatActivity
import com.example.listsofdatademo.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    lateinit var binding: ActivityMainBinding

    val namesList: MutableList<String> = mutableListOf("Aisha", "Fatima", "Zain")
    val cityList : MutableList<String> = mutableListOf("Toronto", "Paris", "New York", "London")
    val menuList : MutableList<String> = mutableListOf("Coffee", "Fries", "Hamburger")
    val studentList:List<Student> = listOf(
        Student("Ryan", 35, true),
        Student("Sasha", 42, false),
        Student("Tina", 61, true),
    )
    val booksList:List<Book> = listOf(
        Book("Harry Potter", "JK Rowling", 342),
        Book("Atomic Habits", "James Clear", 100),
        Book("Programming Android Apps", "ChatGPT", 1),
    )

    val countryList: List<Country> = listOf(Country("India", "Delhi", 1500),
        Country("Canada", "Ottawa", 500),
        Country("Japan", "Tokyo", 1000))

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // ----------------------------------------------------------------
        // Creating an adapter
        // ----------------------------------------------------------------
        val nameAdapter: ArrayAdapter<String>
                = ArrayAdapter(this, android.R.layout.simple_list_item_1, namesList)
        binding.mySpinner.adapter = nameAdapter

        val cityAdapter : ArrayAdapter<String> = ArrayAdapter(this, R.layout.custom_row_layout, this.cityList)
        binding.spinnerCity.adapter = cityAdapter

        val menuAdapter: ArrayAdapter<String> = ArrayAdapter(this, android.R.layout.simple_list_item_1, this.menuList)
        binding.spinnerMenu.adapter = menuAdapter

        val studentAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_item, studentList)
        binding.spStudents.adapter = studentAdapter

        val booksAdapter = BookArrayAdapter(this, booksList)
        binding.spBooks.adapter = booksAdapter

        val countryAdapter = CountryAdapter(this, countryList)
        binding.spCountries.adapter = countryAdapter

        // TODO: detect when the user selects a spinner item


        // ----------------------------------------------------------------
        // Click handler
        // ----------------------------------------------------------------
        binding.btnSubmit.setOnClickListener {


//            binding.resultsLabel.setText("How many items are in the ArrayAdapter? ${nameAdapter.getCount()}")
//
//            val row1 = nameAdapter.getView(0, null, FrameLayout(this))
//            val row2 = nameAdapter.getView(1, null, FrameLayout(this))
//            val row3 = nameAdapter.getView(2, null, FrameLayout(this))
//            binding.main.addView(row1)
//            binding.main.addView(row2)
//            binding.main.addView(row3)
            var output = """
                ${binding.mySpinner.selectedItem.toString()} is having ${binding.spinnerMenu.selectedItem.toString()} in ${binding.spinnerCity.selectedItem.toString()}
                Name:- ${(binding.spStudents.selectedItem as Student).name}
                Age:- ${(binding.spStudents.selectedItem as Student).age}
                Postgraduate?:- ${(binding.spStudents.selectedItem as Student).isPostGrad}
            """.trimIndent()

            binding.resultsLabel.setText(output)
        }

        binding.btnAddCity.setOnClickListener {
            this.cityList.add("Ahmedabad")
            this.cityList.removeAt(0)

            cityAdapter.notifyDataSetChanged()
        }

        binding.btnGetView.setOnClickListener {
            binding.resultsLabel.setText("How many items are in the ArrayAdapter? ${nameAdapter.getCount()}")
            val row1 = nameAdapter.getView(0, null, FrameLayout(this))
            val row2 = nameAdapter.getView(1, null, FrameLayout(this))
            val row3 = nameAdapter.getView(2, null, FrameLayout(this))
            binding.main.addView(row1)
            binding.main.addView(row2)
            binding.main.addView(row3)
        }
    }
}