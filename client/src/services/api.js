import axios from 'axios';

const defaultApiUrl = typeof window !== 'undefined'
  ? ['localhost', '127.0.0.1'].includes(window.location.hostname)
    ? window.location.protocol + '//' + window.location.hostname + ':5001/api'
    : window.location.origin + '/api'
  : 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || defaultApiUrl,
  timeout: 2500
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ott_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // A previously-created offline demo session cannot access the protected
    // MongoDB API. Remove it instead of letting pages silently show demo data.
    if (error.response?.status === 401) {
      localStorage.removeItem('ott_user');
      localStorage.removeItem('ott_token');
      localStorage.removeItem('ott_profile');
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(error);
  }
);
