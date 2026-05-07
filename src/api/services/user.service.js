import apiClient from "../config/axios.js";

export const getUsers = async () => {
  // Now this correctly hits https://modularaxios.onrender.com/users
  const res = await apiClient.get('/users');
  return res.data; // Return only the data, not the whole response object
};

export const getUser = async (id) => {
  const res = await apiClient.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (data) => {
  const res = await apiClient.post('/users', data);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await apiClient.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await apiClient.delete(`/users/${id}`);
  return res.data;
};