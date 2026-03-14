// frontend/src/lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '[localhost](http://localhost:3001/api)',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('heiryn_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
