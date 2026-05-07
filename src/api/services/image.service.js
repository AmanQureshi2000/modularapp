import apiClient from "../config/axios.js";

export const getImages = async () => {
  // Now this correctly hits https://modularaxios.onrender.com/users
  const res = await apiClient.get('/images');
  return res.data; // Return only the data, not the whole response object
};

export const getImage = async (id) => {
  const res = await apiClient.get(`/images/${id}`);
  return res.data;
};

export const uploadImage = async (data) => {
  const res = await apiClient.post('/images', data);
  console.log(res);
  return res.data;
};

export const updateImage = async (id, data) => {
  const res = await apiClient.put(`/images/${id}`, data);
  return res.data;
};

export const deleteImage = async (id) => {
  const res = await apiClient.delete(`/images/${id}`);
  return res.data;
};