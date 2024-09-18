const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },  // Task title
  description: { type: String, required: true },  // Task description
  category: { type: String, required: true },  // Task category
  completed: { type: Boolean, default: false },  // Task completion status
  dueDate: { type: Date },  // Task due date
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user who created the task
  createdAt: { type: Date, default: Date.now },  // Task creation date
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
