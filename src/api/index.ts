import axios from 'axios';

const getApiUrl = () => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_URL) {
    return (window as any).ENV.VITE_API_URL
  }
  return import.meta.env.VITE_API_URL
}

const getApiKey = () => {
  if (typeof window !== 'undefined' && (window as any).ENV?.VITE_API_STORES_KEY) {
    return (window as any).ENV.VITE_API_STORES_KEY
  }
  return import.meta.env.VITE_API_STORES_KEY
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
export default axiosInstance;
