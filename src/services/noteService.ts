import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7013/api', // Update if needed
    headers: { 'Content-Type': 'application/json' },
});

// ✅ Attach Authorization Token Automatically to Requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token from storage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Global Error Handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error.response?.data || error.message);
    }
);

export default api;
