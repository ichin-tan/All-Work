package com.example.tasks_chintan.adapters

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.tasks_chintan.databinding.TaskRowBinding
import com.example.tasks_chintan.interfaces.ClickInterface
import com.example.tasks_chintan.models.Task

class TaskAdapter(val taskList:MutableList<Task>, val clickInterface:ClickInterface) : RecyclerView.Adapter<TaskAdapter.ViewHolder>() {
    inner class ViewHolder(val binding: TaskRowBinding) : RecyclerView.ViewHolder (binding.root) {
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val binding = TaskRowBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun getItemCount(): Int {
        return taskList.size
    }
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {

        val task = this.taskList[position]

        holder.binding.tvTaskName.text = "${task.name}"

        val editImageId = holder.itemView.context.resources.getIdentifier("baseline_edit_24", "drawable", holder.itemView.context.packageName)
        holder.binding.imgUpdate.setImageResource(editImageId)

        val deleteImageId = holder.itemView.context.resources.getIdentifier("baseline_delete_24", "drawable", holder.itemView.context.packageName)
        holder.binding.imgDelete.setImageResource(deleteImageId)

        if(task.isHighPriority) {
            val imageId = holder.itemView.context.resources.getIdentifier("baseline_add_alert_24", "drawable", holder.itemView.context.packageName)
            holder.binding.imgPriority.setImageResource(imageId)
        } else {
            holder.binding.imgPriority.setImageDrawable(null)
        }

        holder.binding.imgDelete.setOnClickListener {
            clickInterface.btnDeleteClicked(position)
        }

        holder.binding.imgUpdate.setOnClickListener {
            clickInterface.btnUpdateClicked(position)
        }
    }
}