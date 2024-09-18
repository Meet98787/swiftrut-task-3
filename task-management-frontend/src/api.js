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

// Get tasks for an admin or user
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
