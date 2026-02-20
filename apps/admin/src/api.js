import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status !== 401 || error.config?._retry) {
      return Promise.reject(error);
    }

    error.config._retry = true;
    try {
      const refreshed = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
      const token = refreshed.data?.data?.accessToken;
      if (token) {
        localStorage.setItem('admin_access_token', token);
        error.config.headers.Authorization = `Bearer ${token}`;
      }
      return api(error.config);
    } catch {
      localStorage.removeItem('admin_access_token');
      return Promise.reject(error);
    }
  },
);
