import axios from 'axios'

const http = axios.create({ baseURL: import.meta.env.VITE_APP_SERVER_URL })

http.interceptors.request.use((config) => {
  
  const accessToken = localStorage.getItem('accessToken');

  if (!config.url.includes('auth') && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default http