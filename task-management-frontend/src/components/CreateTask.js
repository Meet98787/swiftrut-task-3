import React, { useState, useContext } from 'react';
import { createTask } from '../api';
import { AuthContext } from '../auth';
import { TextField, Button, Container, Typography } from '@mui/material';

const CreateTask = () => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      category,
      dueDate,
    };

    try {
      await createTask(taskData, token);
      setTitle('');
      setDescription('');
      setCategory('');
      setDueDate('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Create a Task
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
          Create Task
        </Button>
      </form>
    </Container>
  );
};

export default CreateTask;
