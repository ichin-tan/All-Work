package com.example.tipcalculator

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity:AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val editTextBill = findViewById<EditText>(R.id.editTextBill)
        val editTextTip = findViewById<EditText>(R.id.editTextTip)

        val buttonCalculate = findViewById<Button>(R.id.buttonCalculate)
        val textViewResult = findViewById<TextView>(R.id.textViewResult)

        buttonCalculate.setOnClickListener {
            val billAmount = editTextBill.text.toString().toDouble()
            val tipPercent = editTextTip.text.toString().toDouble()
            val tip: Double =  billAmount * (tipPercent / 100)
            val totalAmount = billAmount + tip
            textViewResult.setText("Bill Amount - ${billAmount}\n Tip percent - ${tipPercent}\n Total Amount - ${totalAmount}")
        }
    }

}