import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle API errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout.");
    }

    if (!error.response) {
      console.error("Network error. Please check your internet connection.");
    } else {
      switch (error.response.status) {
        case 400:
          console.error("Bad Request");
          break;

        case 401:
          console.error("Unauthorized");
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Resource Not Found");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error("Unexpected API Error");
      }
    }

    return Promise.reject(error);
  }
);

export default API;