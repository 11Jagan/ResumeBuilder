import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token and user data on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setToken(userData.token);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
  };

  const register = (userData) => {
    setUser(userData.user);
    setToken(userData.token);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Function to make authenticated API calls
  const apiCall = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    try {
      // Add a timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      console.log('API_BASE_URL:', API_BASE_URL);
      console.log('Full URL:', `${API_BASE_URL}${url}`);
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      if (response.status === 401) {
        // Token expired or invalid
        logout();
        throw new Error('Authentication required');
      }

      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out - server may be down');
        throw new Error('Server connection timed out. Please check if the backend server is running.');
      } else if (error.message.includes('Failed to fetch')) {
        console.error('Network error - server may be down');
        throw new Error('Cannot connect to server. Please check if the backend server is running.');
      }
      throw error;
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    updateUser,
    apiCall,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 