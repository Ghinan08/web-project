import { apiClient } from './apiClient';

export const registerUser = async (payload) => {
  const response = await apiClient.post('/auth/register', payload);
  const token = response.data?.data?.accessToken;
  if (token) {
    localStorage.setItem('accessToken', token);
  }
  return response.data?.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post('/auth/login', payload);
  const token = response.data?.data?.accessToken;
  if (token) {
    localStorage.setItem('accessToken', token);
  }
  return response.data?.data;
};

export const logoutUser = async () => {
  await apiClient.post('/auth/logout');
  localStorage.removeItem('accessToken');
};
