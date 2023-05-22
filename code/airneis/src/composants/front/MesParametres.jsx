import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import Connexion from './Connexion';

function MesParametres() {
  const { isLoggedIn, userInfo, fetchUserInfo } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, fetchUserInfo]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1 className="text-center">Récapitulatif de votre compte</h1>
          <p>Email : {userInfo.email}</p>
          <p>Nom : {userInfo.nom}</p>
        </>
      ) : (
        <>
          <Connexion />
        </>
      )}
    </>
  );
}

export default MesParametres;
