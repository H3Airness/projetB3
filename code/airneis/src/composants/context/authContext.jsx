import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isLoggedInCookie = Cookies.get('isLoggedIn');

    if (isLoggedInCookie) {
      setIsLoggedIn(true);
      fetchAccountData();
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    Cookies.set('isLoggedIn', true, { expires: 1 / 24 }); // 1h
    fetchAccountData();
  };

  const logout = () => {
    setIsLoggedIn(false);
    Cookies.remove('isLoggedIn');
    setNom('');
    setEmail('');
    setPassword('');
  };

  const fetchAccountData = () => {
    axios
      .get('http://airneis.ddns.net:3000/compte.php')
      .then((response) => {
        if (response.data.status === 'success') {
          const { nom, email, password } = response.data;
          setNom(nom);
          setEmail(email);
          setPassword(password);
        } else {
          console.log(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des informations du compte:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, nom, email, password, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
