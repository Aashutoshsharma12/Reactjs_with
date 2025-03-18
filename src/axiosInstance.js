import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
});

// Request Interceptor - Attach token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor - Handle expired token
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log(error, "dppdpdpdpd-")
        if (error.response && error.response.status === 401) {
            console.log("Token expired. Redirecting to login...");
            localStorage.removeItem('token');
            // window.location.href = '/admin/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
