import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

// Axios instance with Authorization header from localStorage
export const api = axios.create({ baseURL });
api.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem('authToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
    return config;
});

export const signup = async (userData) => {
    const { data } = await api.post('/auth/signup', userData);
    console.log("Signup response data:", data);
    return data;
};

export const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    console.log("Login response data:", data);
    return data;
};