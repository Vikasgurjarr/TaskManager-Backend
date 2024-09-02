const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

// GET all tasks
router.get('/tasks', taskController.getTasks);

// POST create a new task
router.post('/tasks', taskController.createNewTask);

// PUT update a task
router.put('/tasks/:id', taskController.updateTask);

// DELETE a task
router.delete('/tasks/:id', taskController.deleteTask);

// POST add a comment to a task
router.post('/tasks/:id/comments', taskController.addComment);

module.exports = router;
