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
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
            <div className="form-group">
              <label>Nom:</label>
              <p>{accountInfo.nom}</p>
            </div>
            <div className="form-group">
              <label>E-mail:</label>
              <p>{accountInfo.email}</p>
            </div>
            <div className="form-group">
              <label>Mot de passe:</label>
              <div className="password-container">
                <p className="form-control password">{maskPassword(accountInfo.password)}</p>
                {!isEditMode && (
                  <button className="btn btn-primary" onClick={handleEditPassword}>
                    Modifier le mot de passe
                  </button>
                )}
              </div>
            </div>
            {isEditMode && (
              <form onSubmit={handleSubmitPassword}>
                <div className="form-group">
                  <label>Nouveau mot de passe:</label>
                  <input type="password" className="form-control" value={newPassword} onChange={handleChangePassword} />
                </div>
                <div className="form-group">
                  <label>Confirmer le nouveau mot de passe:</label>
                  <input type="password" className="form-control" value={confirmPassword} onChange={handleChangeConfirmPassword} />
                </div>
                <div className="button-group">
                  <button type="submit" className="btn btn-primary">Valider</button>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <Connexion />
      )}
    </>
  );
}

export default MesParametres;
