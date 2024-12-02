import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://quiet.pumpeet.me',
  withCredentials: true,
  // credentials: "include", 
  headers: {
    'Content-Type': 'application/json',
  }
});

// // Add request interceptor to include the token in headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken'); // Or use cookies
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Assume you have a refresh token stored
//         const refreshToken = localStorage.getItem('refreshToken');
//         const response = await axiosInstance.post('/auth/refresh', { token: refreshToken });
        
//         const { accessToken } = response.data;
//         localStorage.setItem('accessToken', accessToken);

//         // Retry the original request
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError);
//         // Optionally, handle logout or redirect
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );


export default axiosInstance;
