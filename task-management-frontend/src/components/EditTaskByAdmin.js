import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../api';  // Add API calls
import { AuthContext } from '../auth';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const EditTaskByAdmin = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();  // Get task ID from URL
  const [task, setTask] = useState({
    title: '',
    description: '',
    category: '',
    dueDate: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const fetchedTask = await getTask(id, token);  // Fetch the task details by ID
      setTask({
        title: fetchedTask.title,
        description: fetchedTask.description,
        category: fetchedTask.category,
        dueDate: fetchedTask.dueDate,
      });
    };

    fetchTask();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task, token);  // Update the task by ID
      navigate('/admin/tasks');  // Navigate back to the task list after updating
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Edit Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={task.category}
            onChange={(e) => setTask({ ...task, category: e.target.value })}
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
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update Task
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditTaskByAdmin;
