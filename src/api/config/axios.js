import axios from 'axios';

// 1. Define the base configuration
const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Best practice: don't let requests hang forever
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;