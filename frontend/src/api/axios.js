import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});
axiosInstance.interceptors.request.use((config) => {
  const tokens = JSON.parse(localStorage.getItem('authTokens'));
  if (tokens?.access) {
    config.headers.Authorization = `Bearer ${tokens.access}`;
  }
  return config;
});

// Add response interceptor for automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const tokens = JSON.parse(localStorage.getItem('authTokens'));
      if (tokens?.refresh) {
        try {
          const res = await axiosInstance.post('token/refresh/', {
            refresh: tokens.refresh,
          });
          tokens.access = res.data.access;
          localStorage.setItem('authTokens', JSON.stringify(tokens));
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('authTokens');
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
