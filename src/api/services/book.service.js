import apiClient from "../config/axios.js";

export const getBooks = async () => {
  // Now this correctly hits https://modularaxios.onrender.com/users
  const res = await apiClient.get('/books');
  return res.data; // Return only the data, not the whole response object
};

export const getBook = async (id) => {
  const res = await apiClient.get(`/books/${id}`);
  return res.data;
};

export const createBook = async (data) => {
  const res = await apiClient.post('/books', data);
  return res.data;
};

export const updateBook = async (id, data) => {
  const res = await apiClient.put(`/books/${id}`, data);
  return res.data;
};

export const deleteBook = async (id) => {
  const res = await apiClient.delete(`/books/${id}`);
  return res.data;
};