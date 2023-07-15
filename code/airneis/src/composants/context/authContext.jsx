import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const isLoggedInSession = sessionStorage.getItem('isLoggedIn');

    if (isLoggedInSession) {
      setIsLoggedIn(true);
      const accountIdSession = sessionStorage.getItem('accountId');
      setAccountId(accountIdSession);
    }
  }, []);

  const login = (accountId) => {
    setIsLoggedIn(true);
    setAccountId(accountId);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('accountId', accountId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountId(null);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('accountId');
    sessionStorage.removeItem('accountInfo');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
