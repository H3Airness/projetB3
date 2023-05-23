import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useEffect } from "react";
import Connexion from "./Connexion";
import axios from 'axios';

function MesParametres() {
  const { isLoggedIn, accountId, logout } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else {
      // Logique de soumission du nouveau mot de passe
      setIsEditMode(false);
      setPasswordError('');
    }
  };

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

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
            {isEditMode ? (
              <form onSubmit={handleSubmitPassword}>
                <div className="form-group">
                  <label>Ancien mot de passe:</label>
                  <input type="password" className="form-control" value={oldPassword} onChange={handleChangeOldPassword} />
                </div>
                <div className="form-group">
                  <label>Nouveau mot de passe:</label>
                  <input type="password" className="form-control" value={newPassword} onChange={handleChangeNewPassword} />
                </div>
                <div className="form-group">
                  <label>Confirmez le nouveau mot de passe:</label>
                  <input type="password" className="form-control" value={confirmPassword} onChange={handleChangeConfirmPassword} />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                <div className="button-group">
                  <button type="submit" className="btn btn-primary">Valider</button>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Déconnexion
                  </button>
                </div>
              </form>
            ) : (
              <div className="button-group">
                <button className="btn btn-primary" onClick={handleEditPassword}>
                  Modifier le mot de passe
                </button>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
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
