import axios from "axios";

// Axios instance with base URL from env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Attach JWT token (if exists) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
     // Attach token using Bearer scheme 
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;