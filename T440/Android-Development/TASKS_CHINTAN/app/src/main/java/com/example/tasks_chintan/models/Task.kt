package com.example.tasks_chintan.models

class Task {
    var name: String
    var isHighPriority: Boolean

    constructor(name: String, isHighPriority: Boolean) {
        this.name = name
        this.isHighPriority = isHighPriority
    }
}