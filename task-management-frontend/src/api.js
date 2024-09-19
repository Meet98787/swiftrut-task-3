import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register a new user
export const registerUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/register`, userData);
  return res.data;
};


// Login a user
export const loginUser = async (userData) => {
  const res = await axios.post(`${API_URL}/auth/login`, userData);
  return res.data;
};

// Get tasks for logged-in user
export const getTasks = async (token) => {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: { 'x-auth-token': token },
    });
    return res.data;
  };
  
  // Create a new task
  export const createTask = async (taskData, token) => {
    const res = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: { 'x-auth-token': token },
    });
    return res.data;
  };
  
// Update a task by ID
export const updateTask = async (id, taskData, token) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};

// Get a single task by ID
export const getTask = async (id, token) => {
  const res = await axios.get(`${API_URL}/tasks/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};

  
// Delete a task
  export const deleteTask = async (taskId, token) => {
    const res = await axios.delete(`${API_URL}/tasks/${taskId}`, {
      headers: { 'x-auth-token': token },
    });
    return res.data;
  };

 // Get all tasks (admin only)
export const getAllTasks = async (token) => {
  const res = await axios.get(`${API_URL}/tasks/all`, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};
// Get all users (admin only)
export const getAllUsers = async (token) => {
  const res = await axios.get(`${API_URL}/auth/all`, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};
// Create a task for a specific user (admin only)
export const createTaskForUser = async (taskData, token) => {
  const res = await axios.post(`${API_URL}/tasks/create`, taskData, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};

// Delete a task (admin only)
export const deleteTaskByadmin = async (taskId, token) => {
  const res = await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};

export const updateTaskByadmin = async (id, taskData, token) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
    headers: { 'x-auth-token': token },
  });
  return res.data;
};