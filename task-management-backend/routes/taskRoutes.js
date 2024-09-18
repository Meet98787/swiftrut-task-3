const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController'); // Ensure this is correct

const router = express.Router();

// Define the route to get tasks for the logged-in user
router.get('/', authMiddleware, taskController.getTasksByUser);

// Define the route to create a task
router.post('/', authMiddleware, taskController.createTask);

// Define the route to update a task
router.put('/:id', authMiddleware, taskController.updateTask);

// Define the route to delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask);

// router.get('/all', authMiddleware, adminMiddleware, taskController.getAllTasks);
module.exports = router;


