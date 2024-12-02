import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../axios.jsx'; // Your existing axios instance
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null); // Store token in memory
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Refresh token function
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('/auth/refresh', {}, { withCredentials: true });
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
      return null;
    }
  };

  // Login function
  const login = async (credentials, redirectPageOnSucces = "/") => {
    try {
      const response = await axios.post('/account/login', credentials, { withCredentials: true });
      setAccessToken(response.data.token);
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
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          const newToken = await refreshAccessToken();
          if (newToken) {
            error.config.headers['Authorization'] = `Bearer ${newToken}`;
            return axios(error.config);
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, handleLogout, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};



// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
