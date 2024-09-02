const Task = require('../models/task');

// GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new task
exports.createNewTask = async (req, res) => {
  const task = new Task({
    projectName: req.body.projectName,
    description: req.body.description,
    assignedTo: req.body.assignedTo,
    comments: req.body.comments || [],
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.body.projectName != null) {
      task.projectName = req.body.projectName;
    }
    if (req.body.description != null) {
      task.description = req.body.description;
    }
    if (req.body.assignedTo != null) {
      task.assignedTo = req.body.assignedTo;
    }
    if (req.body.comments != null) {
      task.comments = req.body.comments;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a task

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST add a comment to a task
exports.addComment = async (req, res) => {
  const comment = req.body.comment;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.comments.push(comment);
    const updatedTask = await task.save();
    res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
