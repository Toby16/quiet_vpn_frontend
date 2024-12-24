import { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios.jsx'; // Your existing axiosInstance instance
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null); // Store token in memory
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Refresh token function
  const refreshAccessToken = async () => {
    try {
      const response = await axiosInstance.post('/auth/refresh', {}, { withCredentials: true });
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
      return null;
    }
  };

  // Signup function 
  const signup = async (credentials, redirectPageOnSucces = "/") => {
    try {
      const response = await axios.post('https://quiet.pumpeet.me/account/signup', credentials, { withCredentials: true });
      console.log(response)
      const token = response.data[0].token
      setAccessToken(token)
      setIsAuthenticated(true)
      navigate(redirectPageOnSucces)
    } catch (error) {
      console.error(error)
      throw error; // very handy
    }
  }

  // Login function
  const login = async (credentials, redirectPageOnSucces = "/") => {
    try {
      const response = await axiosInstance.post('/account/login', credentials, { withCredentials: true });
      setAccessToken(response.data.token);
      setIsAuthenticated(true);
      navigate(redirectPageOnSucces); // Redirect on successful login
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Let caller handle errors
    }
  };

  // logig with token
  const login_via_token = async (accessToken, redirectPageOnSucces = "/") => {
    try {
      setAccessToken(accessToken);
      setIsAuthenticated(true);
      navigate(redirectPageOnSucces); // Redirect on successful login
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Let caller handle errors
    }
  };

  // Logout function
  const handleLogout = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page
  };

  // Attach interceptor for token handling
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          const newToken = await refreshAccessToken();
          if (newToken) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(error.config);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, login_via_token, handleLogout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};



// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
