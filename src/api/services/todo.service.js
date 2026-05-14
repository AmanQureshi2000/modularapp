import apiClient from "../config/axios.js";

export const getTodos = async (filters = {}) => {
    // Only include filters that have values
    const params = {};
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;
    if (filters.search) params.search = filters.search;
    
    const res = await apiClient.get('/todos', { params });
    return res.data;
}

export const getTodo = async (id) => {
    const res = await apiClient.get(`/todos/${id}`);
    return res.data;
}

export const createTodo = async (data) => {
    const res = await apiClient.post('/todos', data);
    return res.data;
}

export const updateTodo = async (id, data) => {
    const res = await apiClient.put(`/todos/${id}`, data);
    return res.data;
}

export const deleteTodo = async (id) => {
    const res = await apiClient.delete(`/todos/${id}`);
    return res.data;
}

export const getTodoStats = async () => {
    const res = await apiClient.get('/todos/stats');
    return res.data;
}

export const toggleTodoComplete = async (id) => {
    const res = await apiClient.patch(`/todos/${id}/toggle`);
    return res.data;
}