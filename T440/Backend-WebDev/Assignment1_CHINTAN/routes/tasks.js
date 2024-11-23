
const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// To retrieve all the tasks

router.get('/tasks', async (req, res) => {
    try {
        const arrTasks = await Task.find();
        res.json(arrTasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To get a specific task with id

router.get('/tasks/:id', async (req, res) => {
    try {
        const findedTask = await Task.findById(req.params.id)
        if (findedTask === null) {
            return res.status(404).json({ message: "There is no task with given id!" })
        } else {
            return res.json(findedTask)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// To create a new task

router.post('/tasks', async (req, res) => {
    // Check if title is there
    if (req.body.title === null) {
        return res.status(400).json({ message: 'Title is required' });
    }
    // Check the type of title which must be string
    if (typeof (req.body.title) !== "string") {
        return res.status(400).json({ message: 'Title must be string' });
    }
    // Ensure that priority must be high, low or medium
    if(req.body.priority !== "high") {
        if(req.body.priority !== "low") {
            if(req.body.priority !== "medium") {
                return res.status(400).json({ message: 'Priority must be high, low or medium' });
            }
        }
    } 

    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            completed: req.body.completed
        });
        await newTask.save()
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// To update an existing task

router.put('/tasks/:id', async (req, res) => {
    // Check if title is there
    if (req.body.title === null) {
        return res.status(400).json({ message: 'Title is required' });
    }
    // Check the type of title which must be string
    if (typeof (req.body.title) !== "string") {
        return res.status(400).json({ message: 'Title must be string' });
    }
    // Ensure that priority must be high, low or medium
    if(req.body.priority !== "high") {
        if(req.body.priority !== "low") {
            if(req.body.priority !== "medium") {
                return res.status(400).json({ message: 'Priority must be high, low or medium' });
            }
        }
    } 

    try {
        const taskToUpdate = await Task.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            completed: req.body.completed
        }, { new: true });

        if (taskToUpdate === null) {
            return res.status(404).json({ message: "There is no task with given id!" })
        } else {
            return res.json(taskToUpdate)
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// To delete an existing task

router.delete('/tasks/:id', async (req, res) => {
    try {
        const taskToDelete = await Task.findByIdAndDelete(req.params.id);

        if (taskToDelete === null) {
            return res.status(404).json({ message: "There is no task with given id!" })
        } else {
            return res.json({ message: 'Task deleted successfully!' });
        }
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;