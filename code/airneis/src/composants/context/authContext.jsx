import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountId, setAccountId] = useState(null); // Nouvelle variable d'état pour l'ID du compte

  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');

    if (isLoggedInCookie) {
      setIsLoggedIn(true);
      // Récupérer l'ID du compte depuis les cookies ou votre source de données
      const accountIdCookie = Cookies.get('accountId');
      setAccountId(accountIdCookie);
    }
  }, []);

  const login = (accountId) => {
    setIsLoggedIn(true);
    setAccountId(accountId);
    Cookies.set('isLoggedIn', true, { expires: 1 / 24 }); // 1h
    Cookies.set('accountId', accountId, { expires: 1 / 24 }); // Stocker l'ID du compte dans les cookies
    console.log('ID du compte:', accountId);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccountId(null);
    Cookies.remove('isLoggedIn');
    Cookies.remove('accountId');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
