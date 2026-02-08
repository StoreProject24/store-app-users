import axios from 'axios';

const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_URL) {
    return (window as any).ENV.VITE_API_URL
  }
  return import.meta.env.VITE_API_URL || 'http://localhost:3002/api'
}

const getApiKey = () => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_STORES_KEY) {
    return (window as any).ENV.VITE_API_STORES_KEY
  }
  return import.meta.env.VITE_API_STORES_KEY || '1234'
}

const API_URL = getApiUrl()
const API_KEY = getApiKey()
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-store-domain": window.location.hostname,
    "x-api-stores": API_KEY
  },
})

// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response.data
//   },
//   function (error) {
//     return Promise.reject(error)
//   }
// )

export default axiosInstance;
