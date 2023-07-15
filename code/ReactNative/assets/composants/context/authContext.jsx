import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [accountInfo, setAccountInfo] = useState(null);

  const login = (accountId, accountInfo) => {
    setIsLoggedIn(true);
    setAccountId(accountId);
    setAccountInfo(accountInfo);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountId(null);
    setAccountInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, accountInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
