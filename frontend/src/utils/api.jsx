import axios from 'axios';
const API_URL = "http://localhost:8080/api";

const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      config.headers.Authorization = token ? `Bearer ${token}` : '';
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  export default instance;
