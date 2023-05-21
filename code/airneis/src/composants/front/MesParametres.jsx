import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Connexion from './Connexion';

function MesParametres() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://airneis.ddns.net:3000/compte.php');
        if (response.data.status === 'success') {
          setUser(response.data);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <h1>Récapitulatif de votre compte</h1>
          <p>Nom: {user.nom}</p>
          <p>Email: {user.email}</p>
          <p>Mot de passe: {user.password}</p>
        </>
      ) : (
        <>
          <Connexion/>
        </>
      )}
    </div>
  );
}

export default MesParametres;
