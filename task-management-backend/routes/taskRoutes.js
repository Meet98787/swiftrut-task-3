const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');
const taskController = require('../controllers/taskController'); // Ensure this is correct

const router = express.Router();

// Admin role: get all tasks
router.get('/all', authMiddleware, adminMiddleware, taskController.getAllTasks);

// Admin role: create a task for a specific user
router.post('/create', authMiddleware, adminMiddleware, taskController.createTaskForUser);

// Admin role: edit or delete any task
router.put('/:id', authMiddleware, adminMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, adminMiddleware, taskController.deleteTask);

// Define the route to get tasks for the logged-in user
router.get('/', authMiddleware, taskController.getTasksByUser);

// Define the route to create a task
router.post('/', authMiddleware, taskController.createTask);

// Define the route to update a task
router.put('/:id', authMiddleware, taskController.updateTask);

// Define the route to delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask);

router.get('/:id', authMiddleware, taskController.getTaskById);

// router.get('/all', authMiddleware, adminMiddleware, taskController.getAllTasks);
module.exports = router;


