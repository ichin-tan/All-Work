package com.example.session01

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.example.session01.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {


    lateinit var binding: ActivityMainBinding
    var oneCount = 0
    var twoCount = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

//        binding.btnPress.setOnClickListener {
//            val a: Int = 324
//            val b: Int = 37
//            var result : Double = a + b * 3.45
//            binding.tvResult.setText("The sum is: ${result}")
//        }
//
//        binding.btnWhoWinner.setOnClickListener {
//            var names : List<String> = listOf("Trump", "Harris")
//            val i = (0..1).random()
//            val winner = names[i]
//            binding.tvResult.setText(winner)
//        }
        binding.btnOne.setOnClickListener {
            oneCount ++
            displayResult()
        }

        binding.btnTwo.setOnClickListener {
            twoCount ++
            displayResult()
        }
        displayResult()

    }

    fun displayResult() {
        binding.tvVotesCandidate1.setText("Votes for candidate 1 : ${oneCount}")
        binding.tvVotesCandidate2.setText("Votes for candidate 2 : ${twoCount}")
        binding.tvVotesTotal.setText("Total Votes : ${oneCount + twoCount}")
        if(oneCount + twoCount !== 0) {
            binding.tvPerVotesCandidate1.setText("Percentage of Candidate 1 : ${100 * oneCount / (oneCount + twoCount)}")
            binding.tvPerVotesCandidate2.setText("Percentage of Candidate 2 : ${100 * twoCount / (oneCount + twoCount)}")
        }
    }

}

