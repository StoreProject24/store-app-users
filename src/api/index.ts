import axios from 'axios';

const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_URL) {
    return (window as any).ENV.VITE_API_URL
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:3002/api'
}

const API_URL = getApiUrl()
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance;
