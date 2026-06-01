import apiClient from "../config/axios.js";

export const getDashboard = async () => {
  const res = await apiClient.get('/habits/dashboard');
  return res.data;
};

export const getHabits = async () => {
  const res = await apiClient.get('/habits');
  return res.data;
};

export const getArchivedHabits = async () => {
  const res = await apiClient.get('/habits/archived');
  return res.data;
};

export const getHabit = async (id) => {
  const res = await apiClient.get(`/habits/${id}`);
  return res.data;
};

export const createHabit = async (data) => {
  const res = await apiClient.post('/habits', data);
  return res.data;
};

export const updateHabit = async (id, data) => {
  const res = await apiClient.put(`/habits/${id}`, data);
  return res.data;
};

export const archiveHabit = async (id) => {
  const res = await apiClient.patch(`/habits/${id}/archive`);
  return res.data;
};

export const restoreHabit = async (id) => {
  const res = await apiClient.patch(`/habits/${id}/restore`);
  return res.data;
};

export const deleteHabit = async (id) => {
  const res = await apiClient.delete(`/habits/${id}`);
  return res.data;
};

export const completeHabit = async (habitId, notes = null) => {
  const res = await apiClient.post(`/habits/${habitId}/complete`, { notes });
  return res.data;
};

export const uncompleteHabit = async (completionId) => {
  const res = await apiClient.delete(`/habits/completions/${completionId}`);
  return res.data;
};

export const getChartData = async () => {
  const res = await apiClient.get('/habits/charts/data');
  return res.data;
};