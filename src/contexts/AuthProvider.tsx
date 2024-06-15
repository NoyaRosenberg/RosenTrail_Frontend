import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthData } from '../services/auth.service';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (authData: AuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authDataKey: string = 'auth';

const checkIfLoggedIn = (): boolean => {
  return localStorage.getItem(authDataKey) ? true : false;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(checkIfLoggedIn());

  useEffect(() => {
    setIsLoggedIn(checkIfLoggedIn());
  }, []);

  const login = (authData: AuthData) => {
    localStorage.setItem(authDataKey, JSON.stringify(authData));
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(authDataKey); 
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
