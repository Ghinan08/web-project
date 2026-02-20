export const setToken = (token) => {
  localStorage.setItem('admin_access_token', token);
};

export const getToken = () => localStorage.getItem('admin_access_token');

export const clearToken = () => {
  localStorage.removeItem('admin_access_token');
};
