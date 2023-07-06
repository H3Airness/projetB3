import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";

const MoyenDePaiement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);

  const handleChangePaiement = (e) => {
    setSelectedPaiementId(e.target.value);
  };
 
  const [formDataPaiement, setFormDataPaiement] = useState({
    nom: "",
    numero: "",
    date: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_paiement.php?accountId=${accountId}`);
        if (accountRes.data.status === "success") {
          setAccountPaiement(accountRes.data.accountPaiement);
          setLoading(false);
        } else {
          console.error("Erreur lors de la récupération des données du compte: ", accountRes.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données du compte: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  const handleInputChangePaiement = (e) => {
    setFormDataPaiement({ ...formDataPaiement, [e.target.name]: e.target.value });
  };

  const handleEditPaiement = () => {
    setEditModePaiement(true);

    const selectedPaiement = accountPaiement.find((paiement) => paiement.id === selectedPaiementId);

    setFormDataPaiement({
      nom: selectedPaiement.nom,
      numero: selectedPaiement.numero,
      date: selectedPaiement.date,
      cvv: selectedPaiement.cvv,
    });
  };

  const handleAjoutPaiement = () => {
    setEditModePaiement(true);
    setSelectedPaiementId("");

    setFormDataPaiement({
      nom: "",
      numero: "",
      date: "",
      cvv: "",
    });
  };

  const handleCancelPaiement = () => {
    setEditModePaiement(false);
  };

  const handleSubmitPaiement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_paiement.php', {
        accountId,
        id: selectedPaiementId === "" ? null : selectedPaiementId,
        nom: formDataPaiement.nom,
        numero: formDataPaiement.numero,
        date: formDataPaiement.date,
        cvv: formDataPaiement.cvv,
      });
      if (response.data.status === 'success') {
        setEditModePaiement(false);
        const updatedAccountPaiement = accountPaiement.map((paiement) => {
          if (paiement.id === selectedPaiementId) {
            return {
              ...paiement,
              nom: formDataPaiement.nom,
              numero: formDataPaiement.numero,
              date: formDataPaiement.date,
              cvv: formDataPaiement.cvv,
            };
          }
          return paiement;
        });
        setAccountPaiement(updatedAccountPaiement);
        setSuccessMessagePaiement('Les informations de paiement ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessagePaiement(null);
        }, 2000);
        window.location.reload();
      } else {
        console.error('Erreur lors de la mise à jour des informations de paiement: ', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de paiement: ', error);
    }
  };

  const handleDeletePaiement = async () => {
    try {
      await axios.delete(`http://airneis.ddns.net:3000/delete_info_livraison.php?id=${selectedPaiementId}`);
      const updatedAccountPaiement = accountPaiement.filter((paiement) => paiement.id !== selectedPaiementId);
      setAccountPaiement(updatedAccountPaiement);
      setSelectedPaiementId("");
    } catch (error) {
      console.error('Erreur lors de la suppression du moyen de paiement: ', error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }


  return (
    <>
      {isLoggedIn ? (
        <>
          <div className="mon-compte-container">
            <div className="sidebar-param">
              <h1 className="sidebar-title">Récapitulatif de votre compte</h1>                       
              <div>
                <h2 className='text-center'>Moyen de Paiement</h2>
                {successMessagePaiement && <div className='alert alert-success'>{successMessagePaiement}</div>}
                <br />
                <hr />
                {editModePaiement && (
                  <div>
                    <form onSubmit={handleSubmitPaiement}>
                      <div>
                        <label>Nom sur la carte:</label>
                        <input type='text' name='nom' value={formDataPaiement.nom} onChange={handleInputChangePaiement} required />
                      </div>
                      <div>
                        <label>Numéro de carte:</label>
                        <input type='text' name='numero' value={formDataPaiement.numero} onChange={handleInputChangePaiement} required />
                      </div>
                      <div>
                        <label>Date d’expiration:</label>
                        <input type='text' name='date' value={formDataPaiement.date} onChange={handleInputChangePaiement} required />
                      </div>
                      <div>
                        <label>CVV:</label>
                        <input type='text' name='cvv' value={formDataPaiement.cvv} onChange={handleInputChangePaiement} required />
                      </div>
                      <br />
                      <div className='text-center'>
                        <button type='submit' className='btn-custom btn-custom-right'>Enregistrer 💾</button>
                        <button type='button' className='btn-custom btn-custom-right' onClick={handleCancelPaiement}>Annuler ❌</button>
                      </div>
                    </form>
                  </div>
                )}
            
                {!editModePaiement && (
                  <div>
                    <div>
                      <h3>Moyen de paiement</h3>
                      {accountPaiement.length > 0 ? (
                        <div>
                          <select value={selectedPaiementId} onChange={(e) => handleChangePaiement(e)} className="custom-select-liv">
                            <option value="">Sélectionner un moyen de Paiement</option>
                            {accountPaiement.map((paiement) => (
                              <option key={paiement.id} value={paiement.id}>{paiement.nom}</option>
                            ))}
                          </select>
                          {selectedPaiementId !== "" && (
                            <div>
                              <p>Nom sur la carte: <strong>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).nom}</strong></p>
                              <p>Numéro de carte: <strong>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).numero}</strong></p>
                              <p>Date d’expiration: <strong>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).date}</strong></p>
                              <p>CVV: <strong>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).cvv}</strong></p>
                              <center>
                                <button type='button' className='btn-custom btn-custom-right' onClick={handleEditPaiement}>Modifier ⚙️</button>
                                <button type='button' className='btn-custom btn-custom-right' onClick={handleDeletePaiement}>Supprimer ⛒</button>
                              </center>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                        <p>Aucun moyen de paiement enregistré</p>
                      </div>
                      )}
                    </div>
                    <br />
                    <center>
                        <button type='button' className='btn-custom' onClick={handleAjoutPaiement}>Ajouter un moyen de paiement</button>
                      </center>
                    <br />
                  </div>
                )}
              </div>
              <hr />
              <div className="d-flex">
                <NavLink to='/MesParametres' className='btn-custom link-custom my-3'>
                  Retour
                </NavLink>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Connexion previousLocation={location.pathname} />
        </>
      )}
    </>
  );
};

export default MoyenDePaiement;
