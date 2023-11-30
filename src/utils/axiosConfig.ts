import axios from "axios";

const customAxios = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
    // Add any other headers if needed
  },
});

// Request interceptor
customAxios.interceptors.request.use(
  (config) => {
    console.log(`API call`);
    // You can modify the request config here, such as adding headers
    // or handling authentication tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
customAxios.interceptors.response.use(
  (response) => {
    // You can modify the response data here
    return response;
  },
  (error) => {
    // Handle global errors, e.g., redirect to login on 401 Unauthorized
    return Promise.reject(error);
  }
);

export default customAxios;
