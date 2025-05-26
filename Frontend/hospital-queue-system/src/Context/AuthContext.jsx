import React, { createContext, useContext, useState } from "react";

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default false

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);
