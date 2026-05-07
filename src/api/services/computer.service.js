import apiClient from "../config/axios.js";

export const getComputers = async ()=>{
    const res = await apiClient.get('/computers');
    return res.data;
}

export const getComputer = async (id)=>{
    const res = await apiClient.get(`/computers/${id}`);
    return res.data;
}

export const createComputer = async (data)=>{
    const res = await apiClient.post('/computers', data);
    return res.data;
}

export const updateComputer = async (id, data)=>{
    const res = await apiClient.put(`/computers/${id}`, data);
    return res.data;
}

export const deleteComputer = async (id)=>{
    const res = await apiClient.delete(`/computers/${id}`);
    return res.data;
}
