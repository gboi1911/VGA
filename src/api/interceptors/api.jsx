import axios from 'axios';

// Tạo một instance của axios
const api = axios.create({
    baseURL: url,
});

// Interceptor để thêm token vào header của tất cả yêu cầu
api.interceptors.request.use(
    (config) => {
        // Lấy token mới từ localStorage hoặc state
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;