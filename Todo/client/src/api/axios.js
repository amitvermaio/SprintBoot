import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // Replace with your API base URL
  timeout: 10000, 
  withCredentials: true, 
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('Todo_Token'); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;