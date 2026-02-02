import axios from 'axios';
const ENVS = import.meta.env;
const axiosInstance = axios.create({
  baseURL: ENVS.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance;
