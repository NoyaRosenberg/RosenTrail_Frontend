import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { AuthData } from '../services/auth.service';

interface AuthContextType {
  isLoggedIn: boolean;
  authData: AuthData | null;
  loading: boolean;
  login: (authData: AuthData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const authDataKey = 'currentUser';

const checkIfLoggedIn = (): boolean => {
  return !!localStorage.getItem(authDataKey);
};

const getAuthData = (): AuthData | null => {
  const authData = localStorage.getItem(authDataKey);
  return authData ? JSON.parse(authData) : null;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(checkIfLoggedIn());
  const [authData, setAuthData] = useState<AuthData | null>(getAuthData());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("AuthProvider useEffect - Checking login status");
    setIsLoggedIn(checkIfLoggedIn());
    setAuthData(getAuthData());
    setLoading(false);
    console.log("AuthProvider useEffect - isLoggedIn:", isLoggedIn, "authData:", authData);
  }, []);

  const login = (authData: AuthData) => {
    console.log("Logging in with authData:", authData);
    localStorage.setItem(authDataKey, JSON.stringify(authData));
    setIsLoggedIn(true);
    setAuthData(authData);
  };
  
  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem(authDataKey); 
    setIsLoggedIn(false);
    setAuthData(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, authData, login, logout }}>
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
