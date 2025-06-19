import axios from 'axios';

const api = axios.create({
    // REACT_APP_BACKEND_URL will be picked up from your .env file in Create React App
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['auth-token'] = token;
        }

        return config; // Return the modified config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api; // Export the configured Axios instance
