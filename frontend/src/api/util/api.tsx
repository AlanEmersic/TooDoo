import axios from "axios";
const API_URL: string = process.env.REACT_APP_API_URL as string;

const defaultOptions = {
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";

    return config;
  },
  (error) => {
    console.log(API_URL);

    return Promise.reject(error);
  }
);

export default instance;
