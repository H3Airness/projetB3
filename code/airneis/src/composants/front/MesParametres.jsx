import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useEffect } from "react";
import Connexion from "./Connexion";
import axios from "axios";
import PasswordInput from "./HidePassword";
import { useNavigate, useLocation } from "react-router-dom";

function MesParametres() {
  const { isLoggedIn, accountId } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [accountInfo, setAccountInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const storedAccountInfo = localStorage.getItem("accountInfo");
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
        const response = await axios.post(
          "http://airneis.ddns.net:3000/compte.php",
          {
            accountId,
            isLoggedIn: isLoggedIn,
          }
        );
        if (response.data.status === "success") {
          setAccountInfo(response.data.accountInfo);
          localStorage.setItem(
            "accountInfo",
            JSON.stringify(response.data.accountInfo)
          );
        } else {
          console.error(response.data.message);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPassword = () => {
    setIsEditMode(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleAddresses = () => {
    setIsEditMode(false);
    navigate("/userAdresses");
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      setPasswordError("Veuillez remplir tous les champs");
    } else {
      try {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/edit-password.php",
          {
            accountId,
            isLoggedIn: isLoggedIn,
            oldPassword,
            newPassword,
          }
        );
        if (response.data.status === "success") {
          alert("Mot de passe modifié avec succès");
          setIsEditMode(false);
          setPasswordError("");
        } else {
          setPasswordError(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
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
          <div className="sidebar-param">
            <h1 className="sidebar-title">Récapitulatif de votre compte</h1>
            <hr />
            {isEditMode ? (
              <form onSubmit={handleSubmitPassword}>
                <div className="form-group">
                  <label className="label-mdp">Ancien mot de passe:</label>
                  <PasswordInput
                    value={oldPassword}
                    onChange={handleChangeOldPassword}
                  />
                </div>
                <div className="form-group">
                  <label className="label-mdp">Nouveau mot de passe:</label>
                  <PasswordInput
                    value={newPassword}
                    onChange={handleChangeNewPassword}
                  />
                </div>
                <div className="form-group">
                  <label className="label-mdp">
                    Répéter le nouveau mot de passe:
                  </label>
                  <PasswordInput
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                  />
                </div>
                {passwordError && (
                  <p className="error-message">{passwordError}</p>
                )}
                <div className="button-group">
                  <button type="submit" className="btn-custom">
                    Valider ✔️
                  </button>
                  <button
                    className="btn-custom"
                    onClick={() => setIsEditMode(false)}
                  >
                    Annuler ❌
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="form-group">
                  <label className="label-nom">Nom:</label>
                  <p className="form-control">{accountInfo.nom}</p>
                </div>
                <div className="form-group">
                  <label className="label-email">E-mail:</label>
                  <p className="form-control">{accountInfo.email}</p>
                </div>
                <div className="button-group">
                  <label className="label-mdp">Mot de passe:</label>
                  <p className="form-control password">••••••••</p>
                  <button
                    className="btn-custom"
                    onClick={handleEditPassword}
                  >
                    Modifier le mot de passe
                  </button>
                </div>
                <br />
                <hr />
                <div className="button-group">
                  <br/>
                  <button className="btn-custom">
                    Mes moyens de paiements
                  </button>
                  <button className="btn-custom" onClick={handleAddresses}>
                    Mes adresses
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <Connexion previousLocation={location.pathname} />
        </>
      )}
    </>
  );
}

export default MesParametres;