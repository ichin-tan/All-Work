package com.example.tasks_chintan

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.tasks_chintan.adapters.TaskAdapter
import com.example.tasks_chintan.databinding.ActivityTasksBinding
import com.example.tasks_chintan.interfaces.ClickInterface
import com.example.tasks_chintan.models.Task
import com.google.android.material.snackbar.Snackbar

class TasksActivity : AppCompatActivity(), ClickInterface {
    private lateinit var binding: ActivityTasksBinding
    lateinit var adapter: TaskAdapter
    var tempPosition = 9999

    var taskList: MutableList<Task> = mutableListOf(
        Task("Go to library", true),
        Task("Have Lunch", false),
        Task("Wash Dishes", true)
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTasksBinding.inflate(layoutInflater)
        setContentView(binding.root)

        this.adapter = TaskAdapter(this.taskList, this)
        binding.rvTasks.adapter = adapter
        binding.rvTasks.layoutManager = LinearLayoutManager(this)
        binding.rvTasks.addItemDecoration(
            DividerItemDecoration(
                this,
                LinearLayoutManager.VERTICAL
            )
        )

        binding.btnUpdateTask.isEnabled = false

        binding.btnAddTask.setOnClickListener {
            if(this.isValid()) {
                var taskName = binding.etEnterTask.text
                var isHighPriority = binding.switchHighPriority.isChecked
                var task = Task("${taskName}",isHighPriority)
                this.taskList.add(task)
                this.adapter.notifyDataSetChanged()
                this.emptyUI()
            }
        }

        binding.btnUpdateTask.setOnClickListener {
            if(this.isValid()) {
                var updatedTask = Task("${binding.etEnterTask.text}",binding.switchHighPriority.isChecked)
                this.taskList[tempPosition].name = updatedTask.name
                this.taskList[tempPosition].isHighPriority = updatedTask.isHighPriority
                this.adapter.notifyDataSetChanged()
                binding.btnUpdateTask.isEnabled = false
                binding.btnAddTask.isEnabled = true
                this.tempPosition = 9999
                this.emptyUI()
            }
        }
    }

    override fun btnUpdateClicked(position: Int) {
        binding.btnUpdateTask.isEnabled = true
        binding.btnAddTask.isEnabled = false
        binding.switchHighPriority.isChecked = this.taskList[position].isHighPriority
        binding.etEnterTask.setText("${this.taskList[position].name}")
        this.tempPosition = position
    }

    override fun btnDeleteClicked(position: Int) {
        this.taskList.removeAt(position)
        this.adapter.notifyDataSetChanged()
    }

    fun emptyUI() {
        binding.etEnterTask.setText("")
        binding.switchHighPriority.isChecked = false
        binding.etEnterTask.requestFocus()
    }

    fun isValid(): Boolean {
        if(binding.etEnterTask.text.toString().isEmpty()) {
            val snackbar = Snackbar.make(binding.root, "ERROR: Please enter name!!!", Snackbar.LENGTH_LONG)
            snackbar.show()
            return false
        }
        return true
    }
}