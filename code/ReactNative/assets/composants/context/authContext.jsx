import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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

  const saveAccountInfo = async (accountInfo) => {
    try {
      await AsyncStorage.setItem("accountInfo", JSON.stringify(accountInfo));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, accountId, login, logout, saveAccountInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
