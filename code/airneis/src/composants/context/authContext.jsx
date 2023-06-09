import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');

    if (isLoggedInCookie) {
      setIsLoggedIn(true);
      const accountIdCookie = Cookies.get('accountId');
      setAccountId(accountIdCookie);
    }
  }, []);

  const login = (accountId) => {
    setIsLoggedIn(true);
    setAccountId(accountId);
    Cookies.set('isLoggedIn', 'true', { expires: 1 , path: '/' });
    Cookies.set('accountId', accountId, { expires: 1 / 24 , path: '/' });;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountId(null);
    Cookies.remove('isLoggedIn');
    Cookies.remove('accountId');
    localStorage.removeItem('accountInfo');
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
