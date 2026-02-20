import { apiClient } from './apiClient';

export const fetchContentList = async (type, params = {}) => {
  const response = await apiClient.get(`/${type}`, {
    params,
  });
  return response.data?.data;
};
