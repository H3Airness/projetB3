import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useEffect } from "react";
import Connexion from "./Connexion";
import axios from 'axios';

function MesParametres() {
  const { isLoggedIn, accountId, logout } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const storedAccountInfo = localStorage.getItem('accountInfo');
    if (storedAccountInfo) {
      setAccountInfo(JSON.parse(storedAccountInfo));
      setLoading(false);
    } else {
      fetchAccountInfo();
    }
  }, []);

  const fetchAccountInfo = async () => {
    try {
      if (isLoggedIn) {
        const response = await axios.post('http://airneis.ddns.net:3000/compte.php', {
          accountId,
          isLoggedIn: isLoggedIn,
        });
        if (response.data.status === "success") {
          setAccountInfo(response.data.accountInfo);
          localStorage.setItem('accountInfo', JSON.stringify(response.data.accountInfo));
        } else {
          console.error(response.data.message);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accountInfo');
    logout(); // Appel de la fonction de déconnexion fournie par le contexte
  };

  const handleEditPassword = () => {
    setIsEditMode(true);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // Logique de soumission du nouveau mot de passe
    setIsEditMode(false); // Fin de l'édition
  };

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  const maskPassword = (password) => {
    return isEditMode ? password : '•'.repeat(Math.min(password.length, 6));
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="mon-compte-container">
          <div className="sidebar">
            <h1 className="sidebar-title">Récapitulatif de votre compte</h1>
            <p>Nom: {accountInfo.nom}</p>
            <p>E-mail: {accountInfo.email}</p>
            <div className="password-container">
              <p className="password">Mot de passe: {maskPassword(accountInfo.password)}</p>
              {!isEditMode && (
                <button className="bouton-edition" onClick={handleEditPassword}>
                  Modifier le mot de passe
                </button>
              )}
            </div>
            {isEditMode && (
              <form onSubmit={handleSubmitPassword}>
                <input type="password" value={newPassword} onChange={handleChangePassword} />
                <button type="submit">Valider</button>
              </form>
            )}
            <button className="bouton-deconnexion" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      ) : (
        <Connexion />
      )}
    </>
  );
}

export default MesParametres;
