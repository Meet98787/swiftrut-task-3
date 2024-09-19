import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { getAllTasks, deleteTask } from '../api';
import { AuthContext } from '../auth';
import { Button, Grid, Card, CardContent, Typography, Container } from '@mui/material';

const AdminTaskList = () => {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTasks = await getAllTasks(token);
      setTasks(fetchedTasks);
    };

    fetchData();
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
    navigate(`/edit-task/${taskId}`);  // Navigate to the EditTask component with the task ID
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Admin Task Management
      </Typography>

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
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleEdit(task._id)}
                  >
                    Edit
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
