import React, { useState, useEffect, useContext } from 'react';
import { getAllTasks, deleteTaskByadmin, getAllUsers, createTaskForUser } from '../api';
import { AuthContext } from '../auth';
import { Button, Grid, Card, CardContent, Typography, Container, Select, MenuItem, TextField } from '@mui/material';

const AdminTaskList = () => {
  const { token } = useContext(AuthContext); // Context to get the user's auth token
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(''); // To store the selected user for task assignment
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    category: '',
    dueDate: ''
  });

  // Fetch all tasks and users on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await getAllTasks(token);  // Fetch all tasks
      const fetchedUsers = await getAllUsers(token);  // Fetch all users
      setTasks(fetchedTasks);
      setUsers(fetchedUsers);
    };

    fetchData();
  }, [token]);

  // Function to delete a task
  const handleDelete = async (taskId) => {
    try {
      await deleteTaskByadmin(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  // Function to create a task for a specific user
  const handleCreateTask = async () => {
    const taskToCreate = { ...taskData, userId: selectedUser };

    try {
      const newTask = await createTaskForUser(taskToCreate, token);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskData({ title: '', description: '', category: '', dueDate: '' }); // Reset form after task creation
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Task Management
      </Typography>

      {/* Create Task for a Specific User */}
      <Typography variant="h5" gutterBottom>
        Create Task for User
      </Typography>
      <Select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        fullWidth
        displayEmpty
      >
        <MenuItem value="" disabled>Select User</MenuItem>
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            {user.username} ({user.email})
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        required
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        required
      />
      <TextField
        label="Category"
        fullWidth
        margin="normal"
        value={taskData.category}
        onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
        required
      />
      <TextField
        label="Due Date"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={taskData.dueDate}
        onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
        required
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCreateTask}
      >
        Create Task
      </Button>

      {/* Show All Tasks */}
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {task.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {task.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Assigned to: {task.user.username}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 2 }}
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No tasks found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AdminTaskList;
