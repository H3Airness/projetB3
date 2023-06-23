import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);

  const login = (accountId) => {
    setIsLoggedIn(true);
    setAccountId(accountId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
