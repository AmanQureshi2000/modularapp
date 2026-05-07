import apiClient from "../config/axios.js";

export const getCategories = async ()=>{
    const res = await apiClient.get('/categories');
    return res.data;
}

export const getCategory = async (id)=>{
    const res = await apiClient.get(`/categories/${id}`);
    return res.data;
}

export const createCategory= async (data)=>{
    const res = await apiClient.post('/categories', data);
    return res.data;
}

export const updateCategory = async (id, data)=>{
    const res = await apiClient.put(`/categories/${id}`, data);
    return res.data;
}

export const deleteCategory = async (id)=>{
    const res = await apiClient.delete(`/categories/${id}`);
    return res.data;
}
