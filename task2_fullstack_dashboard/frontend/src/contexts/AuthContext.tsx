import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  username: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/check-auth', {
        withCredentials: true
      });
      if (response.data.authenticated) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        setUsername(response.data.username);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole(null);
      setUsername(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', 
        { username, password },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsAuthenticated(true);
        setUserRole(response.data.role);
        setUsername(response.data.username);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setUserRole(null);
      setUsername(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 