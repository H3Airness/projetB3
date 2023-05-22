import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');

    if (isLoggedInCookie) {
      setIsLoggedIn(true);
      fetchAccountData();
    }
  }, []);

  const login = async () => {
    try {
      setIsLoggedIn(true);
      Cookies.set('isLoggedIn', true, { expires: 1 / 24 }); // 1h

      const response = await axios.get('http://airneis.ddns.net:3000/compte.php', {
        withCredentials: true,
      });

      if (response.data.status === 'success') {
        Cookies.set('user_id', response.data.user.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove('isLoggedIn');
    Cookies.remove('user_id');
    setUserInfo({});
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://airneis.ddns.net:3000/compte.php', {
        withCredentials: true,
      });

      if (response.data.status === 'success') {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo, fetchUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
