const Task = require('../models/Task');

// Get tasks for the logged-in user
exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// In taskController.js

exports.createTask = async (req, res) => {
    const { title, description, category, dueDate } = req.body;
    try {
      const task = new Task({
        title,
        description,
        category,
        dueDate,
        user: req.user.id,  // Assume the user is authenticated
      });
      await task.save();
  
      // Emit the new task to all connected clients
      req.io.emit('taskCreated', task);
  
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
// Update a task
exports.updateTask = async (req, res) => {
  const { title, description, category, completed, dueDate } = req.body;
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check if the user is either the task owner or an admin
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.category = category || task.category;
    task.completed = typeof completed === 'boolean' ? completed : task.completed;
    task.dueDate = dueDate || task.dueDate;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Check if the user is either the task owner or an admin
    if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
