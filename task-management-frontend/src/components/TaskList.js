import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { getTasks, deleteTask, updateTask } from '../api'; // Assuming these APIs are available
import { AuthContext } from '../auth';
import { Button, Grid, Card, CardContent, Typography, Container } from '@mui/material';

const socket = io('http://localhost:5000'); // Ensure the backend URL is correct

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks(token);
      setTasks(fetchedTasks);
    };

    fetchTasks();

    socket.on('taskCreated', (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('taskDeleted', (deletedTaskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleUpdate = (taskId) => {
    // Navigate to update page or trigger update modal
    // This can be replaced with actual update logic or navigation
    console.log('Update Task:', taskId);
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Task List
      </Typography>
      <Grid container spacing={3}>
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
                    Category: {task.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleUpdate(task._id)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, ml: 2 }}
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

export default TaskList;
