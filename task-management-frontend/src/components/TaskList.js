import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getTasks, deleteTask } from '../api';
import { AuthContext } from '../auth';
import { Button, Grid, Card, CardContent, Typography, Container } from '@mui/material';

const socket = io('http://localhost:5000'); // Ensure the backend URL is correct

const TaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks(token);
      setTasks(fetchedTasks);
    };

    fetchTasks();

    socket.on('taskCreated', (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on('taskDeleted', (deletedTaskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== deletedTaskId));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskDeleted');
    };
  }, [token]);

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleEdit = (taskId) => {
    navigate(`/edit-task/${taskId}`); // Navigate to EditTask component with task ID
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Task List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate('/create-task')} // Navigate to create task page
      >
        Create Task
      </Button>
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
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, mr: 2 }}
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleEdit(task._id)}
                  >
                    Update
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
