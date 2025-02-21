// src/api/authApi.ts
import api from './noteService';

export const registerUser = async (userData: { username: string; password: string }) => {
    try {
        const response = await api.post('/Auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error('Registration failed');
    }
};

export const loginUser = async (userData: { username: string; password: string }) => {
    try {
        const response = await api.post('/Auth/login', userData);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token); // Store token in localStorage
        }
        return response.data;
    } catch (error) {
        throw new Error('Invalid credentials');
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
};
