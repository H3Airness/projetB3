import React, { useState, useContext, useEffect } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";

const Paiement = () => {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const { moyenPaiement } = useContext(InfoCommandeContext);

  const handlePayer = () => {
    if (selectedPaiementId) {
      const Paiement = accountPaiement    
      moyenPaiement(Paiement);
      navigate("/ConfirmationCommande");
    } else {
      setErrorMessage("Veuillez renseigner ou sélectionner un moyen de paiement");
    }
  };

  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);
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
        window.location.href = "/Paiement";
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
          <h1 className="mb-4 text-center">Paiement</h1>
          {panier.length === 0 ? (
            <>
            <center>
              <p>Votre panier est vide. ☹️</p>
              <NavLink to="/recherche" className="btn btn-success">
                Voir notre catalogue
              </NavLink>
            </center>
          </>
          ) : (
          <div className="rounded flex-column Min-heightConteinerPanier">
            <div className="d-flex align-items-center justify-content-center">
              <div className="bg-body rounded mb-2 divLivraisonArticles">
                <h3 className="text-center mb-5">Vos articles sélectionnés</h3>
                <table className="table">
                  <tbody className="vertical-align">
                    {panier.map((produit) => {
                      return (
                        <tr key={produit.id}>
                          <td>
                            <img
                              className="rounded d-block"
                              width={100}
                              src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                              alt={produit.nom}
                            />
                          </td>

                          <td>
                            <p>{produit.nom}</p>
                          </td>

                          <td>
                            <span className="mx-2">{produit.quantite}</span>
                          </td>

                          <td>
                            {new Intl.NumberFormat("fr-FR", {
                              style: "currency",
                              currency: "EUR",
                            }).format(getTotalProduit(produit))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <br />
                <p>
                  Montant des articles: &nbsp;
                  {new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(getTotalPanier())}
                </p>
                <p>Livraison : 10€</p>
                <div className="fw-bold TotalPayer ml-2">
                  <h6>
                    Total :{" "}
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(getTotalPanier() + 10)}
                  </h6>
                </div>
              </div>
            </div>
                        

            <div className="mon-compte-container">
              <div className="sidebar">
                <h2 className='text-center'>Moyen de Paiement</h2>
                {successMessagePaiement && <div className='alert alert-success'>{successMessagePaiement}</div>}
                <br />
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
                        <button type='submit' className='btn btn-primary'>Enregistrer</button>
                        <button type='button' className='btn btn-secondary' onClick={handleCancelPaiement}>Annuler</button>
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
                          <select value={selectedPaiementId} onChange={(e) => setSelectedPaiementId(e.target.value)}>
                            <option value="">Sélectionner un moyen de Paiement</option>
                            {accountPaiement.map((paiement) => (
                              <option key={paiement.id} value={paiement.id}>{paiement.nom}</option>
                            ))}
                          </select>
                          {selectedPaiementId !== "" && (
                            <div>
                              <p>Nom sur la carte: {accountPaiement.find((paiement) => paiement.id === selectedPaiementId).nom}</p>
                              <p>Numéro de carte: {accountPaiement.find((paiement) => paiement.id === selectedPaiementId).numero}</p>
                              <p>Date d’expiration: {accountPaiement.find((paiement) => paiement.id === selectedPaiementId).date}</p>
                              <p>CVV: {accountPaiement.find((paiement) => paiement.id === selectedPaiementId).cvv}</p>
                              <center>
                                <button type='button' className='btn btn-warning' onClick={handleEditPaiement}>Modifier</button>
                                &emsp;
                                <button type='button' className='btn btn-danger my-3' onClick={handleDeletePaiement}>Supprimer</button>
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
                    <center>
                          <button type='button' className='btn btn-primary' onClick={handleAjoutPaiement}>Ajouter</button>
                        </center>
                    <br />
                  </div>
                )}
              </div>
            </div>
            <div className="item-align-center">
              {errorMessage && (
                <p className="text-center erreurPanier">{errorMessage}</p>
              )}
              <div className="d-flex justify-content-between">
                <NavLink to='/Livraison' className='btn btn-light my-3'>
                  Retour
                </NavLink>
                &emsp;
                <button className="btn btn-primary my-3" onClick={handlePayer}>
                  Confirmer ma commande
                </button>
              </div>
            </div>
          </div>
          )}
        </>
      ) : (
        <>
          <Connexion previousLocation={location.pathname} />
        </>
      )}
    </>
  );
};

export default Paiement;
