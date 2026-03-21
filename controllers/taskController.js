const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
};

//create task
exports.createTask = async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
};

//update task
exports.updateTask = async (req, res) => {

    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if(!task) {
            return res.status(400).json({message: "Task not found"});

        }

        res.json(task);
    } catch (error) {
        res.status(500).json({message:"Server error"});

    }
};
//delete Task
exports.deleteTask = async (req, res) => {
    try {

        const task = await Taas.findByIdAndDelete(req.params.id);
        
        if(!task) {
            return res.status(400).json({message: "Task not found"});

        }
        res.json({message: "Task deleted successfully"});
    
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};