import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useEffect } from "react";
import Connexion from "./Connexion";
import axios from 'axios';

function MesParametres() {
  const { isLoggedIn, accountId } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/compte.php', { accountId });
      if (response.data.status === "success") {
        setAccountInfo(response.data.accountInfo);
      } else {
        console.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1 className="text-center">Récapitulatif de votre compte</h1>
          <p>Nom: {accountInfo.nom}</p>
          <p>E-mail: {accountInfo.email}</p>
        </>
      ) : (
        <>
          <Connexion/>
        </>
      )}
    </>
  );
}

export default MesParametres;
