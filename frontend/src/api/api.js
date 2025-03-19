// Create a separate api.js file
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://blog-post-z8g6.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;