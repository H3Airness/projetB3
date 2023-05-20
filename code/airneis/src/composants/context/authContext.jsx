import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Code pour gérer la connexion de l'utilisateur
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Code pour gérer la déconnexion de l'utilisateur
    setIsLoggedIn(false);
  };
  console.log('isLoggedIn:', isLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
