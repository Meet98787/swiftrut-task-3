import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask } from '../api'; // Assuming you have a getTask API
import { AuthContext } from '../auth';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const EditTask = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams(); // Get task ID from URL
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      const task = await getTask(id, token); // Fetch the task by ID
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setDueDate(task.dueDate);
    };

    fetchTask();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, category, dueDate };

    try {
      await updateTask(id, taskData, token); // Update the task
      navigate('/'); // Navigate back to TaskList after updating
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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

export default EditTask;
