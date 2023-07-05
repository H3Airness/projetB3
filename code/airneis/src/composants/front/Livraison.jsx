import React, { useState, useContext, useEffect } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";

const Livraison = () => {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAdresseId, setSelectedAdresseId] = useState("");
  const { adresseLivraisonSelectionner, adresseLivraisonFacturation } = useContext(InfoCommandeContext);

  const handleChangeAdresse = (e) => {
    setSelectedAdresseId(e.target.value);
  };
  
  const handlePayer = () => {
    if (selectedAdresseId &&
      (accountFac.nom_facturation ||
        accountFac.prenom_facturation ||
        accountFac.pays_facturation ||
        accountFac.adresse_facturation ||
        accountFac.code_postal_facturation ||
        accountFac.ville_facturation)
    ){
      const selectedAdresse = accountInfo.find(
        (adresse) => adresse.id === selectedAdresseId
      );

      const adresseLivraison = {
        nomAdresseLivraison: selectedAdresse.nom_adresse,
        nomLivraison: selectedAdresse.nom,
        prenomLivraison: selectedAdresse.prenom,
        adresseLivraison: selectedAdresse.adresse1,
        adresseLivraison2: selectedAdresse.adresse2,
        codePostalLivraison: selectedAdresse.code_postal,
        villeLivraison: selectedAdresse.code_postal,
        paysLivraison: selectedAdresse.pays,
      };

      const adresseFacturation = {
        nomFacturation: accountFac.nom_facturation,
        prenomFacturation: accountFac.prenom_facturation,
        adresseFacturation: accountFac.adresse_facturation,
        codePostalFacturation: accountFac.code_postal_facturation,
        villeFacturation: accountFac.ville_facturation,
        paysFacturation: accountFac.pays_facturation,
      };
    
      adresseLivraisonSelectionner(adresseLivraison);
      adresseLivraisonFacturation(adresseFacturation);
      navigate("/Paiement");
    } else {
      setErrorMessage("Veuillez renseigner une adresse de livraison et une adresse de facturation");
    }
  };

  const [loading, setLoading] = useState(true);
  const {accountId, isLoggedIn} = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState([]);
  const [accountFac, setAccountFac] = useState({});
  const [editModeLivraison, setEditModeLivraison] = useState(false);
  const [formDataLivraison, setFormDataLivraison] = useState({
    nomAdresse: '',
    nom: '',
    prenom: '',
    adresseLivraison: '',
    adresseLivraison2: '',
    codePostalLivraison: '',
    villeLivraison: '',
    pays: '',
  });
  const [editModeFacturation, setEditModeFacturation] = useState(false);
  const [formDataFacturation, setFormDataFacturation] = useState({
    nomFacturation:'',
    prenomFacturation:'',
    adresseFacturation: '',
    codePostalFacturation: '',
    villeFacturation: '',
    paysFacturation: '',
  });
  const [successMessageLivraison, setSuccessMessageLivraison] = useState(null);
  const [successMessageFacturation, setSuccessMessageFacturation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountInfo(accountRes.data.accountLivraisons);
          setLoading(false);
        } else {
          console.error('Erreur lors de la récupération des données du compte: ', accountRes.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du compte: ', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_facturation.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountFac(accountRes.data.accountLivraison);
          setLoading(false);
        } else {
          console.error('Erreur lors de la récupération des données du compte: ', accountRes.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du compte: ', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  const handleInputChangeLivraison = (e) => {
    setFormDataLivraison({ ...formDataLivraison, [e.target.name]: e.target.value });
  };

  const handleInputChangeFacturation = (e) => {
    setFormDataFacturation({ ...formDataFacturation, [e.target.name]: e.target.value });
  };

  const handleEditLivraison = () => {
    setEditModeLivraison(true);
    setEditModeFacturation(false);
  
    const selectedAdresse = accountInfo.find((adresse) => adresse.id === selectedAdresseId);
  
    setFormDataLivraison({
      nomAdresse: selectedAdresse.nom_adresse,
      nom: selectedAdresse.nom,
      prenom: selectedAdresse.prenom,
      adresseLivraison: selectedAdresse.adresse1,
      adresseLivraison2: selectedAdresse.adresse2,
      codePostalLivraison: selectedAdresse.code_postal,
      villeLivraison: selectedAdresse.ville,
      pays: selectedAdresse.pays,
    });
  
    setFormDataFacturation({
      nomFacturation: '',
      prenomFacturation: '',
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };

  const handleAjoutLivraison = () => {
    setEditModeLivraison(true);
    setEditModeFacturation(false);
    setSelectedAdresseId("");
  
    const selectedAdresse = accountInfo.find((adresse) => adresse.id === selectedAdresseId);
  
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
    });
  
    setFormDataFacturation({
      nomFacturation: '',
      prenomFacturation: '',
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };
  
  const handleEditFacturation = () => {
    setEditModeFacturation(true);
    setEditModeLivraison(false);
  
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
    });
  
    setFormDataFacturation({
      nomFacturation: accountFac.nom_facturation,
      prenomFacturation: accountFac.prenom_facturation,
      adresseFacturation: accountFac.adresse_facturation,
      codePostalFacturation: accountFac.code_postal_facturation,
      villeFacturation: accountFac.ville_facturation,
      paysFacturation: accountFac.pays_facturation,
    });
  };

  const handleCancelLivraison = () => {
    setEditModeLivraison(false);
  };

  const handleCancelFacturation = () => {
    setEditModeFacturation(false);
  };

  const handleSubmitLivraison = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_livraison.php', {
        accountId,
        id: selectedAdresseId === "" ? null : selectedAdresseId,
        nomAdresse: formDataLivraison.nomAdresse,
        nom: formDataLivraison.nom,
        prenom: formDataLivraison.prenom,
        adresseLivraison: formDataLivraison.adresseLivraison,
        adresseLivraison2: formDataLivraison.adresseLivraison2,
        codePostalLivraison: formDataLivraison.codePostalLivraison,
        villeLivraison: formDataLivraison.villeLivraison,
        pays: formDataLivraison.pays,
      });
      if (response.data.status === 'success') {
        setEditModeLivraison(false);
        const updatedAccountInfo = accountInfo.map((adresse) => {
          if (adresse.id === selectedAdresseId) {
            return {
              ...adresse,
              nom_adresse: formDataLivraison.nomAdresse,
              nom: formDataLivraison.nom,
              prenom: formDataLivraison.prenom,
              adresse1: formDataLivraison.adresseLivraison,
              adresse2: formDataLivraison.adresseLivraison2,
              code_postal: formDataLivraison.codePostalLivraison,
              ville: formDataLivraison.villeLivraison,
              pays: formDataLivraison.pays,
            };
          }
          return adresse;
        });
        setAccountInfo(updatedAccountInfo);
        setSuccessMessageLivraison('Les informations de livraison ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageLivraison(null);
        }, 2000);
        window.location.href = "/livraison";
      } else {
        console.error('Erreur lors de la mise à jour des informations de livraison: ', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de livraison: ', error);
    }
  };

  const handleSubmitFacturation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        nomFacturation: formDataFacturation.nomFacturation,
        prenomFacturation: formDataFacturation.prenomFacturation,
        adresseFacturation: formDataFacturation.adresseFacturation,
        codePostalFacturation: formDataFacturation.codePostalFacturation,
        villeFacturation: formDataFacturation.villeFacturation,
        paysFacturation: formDataFacturation.paysFacturation,
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountFac({
          ...accountFac,
          nom_facturation: formDataFacturation.nomFacturation,
          prenom_facturation: formDataFacturation.prenomFacturation,
          adresse_facturation: formDataFacturation.adresseFacturation,
          code_postal_facturation: formDataFacturation.codePostalFacturation,
          ville_facturation: formDataFacturation.villeFacturation,
          pays_facturation: formDataFacturation.paysFacturation,
        });
        setSuccessMessageFacturation('Les informations de facturation ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageFacturation(null);
        }, 2000);
      } else {
        console.error('Erreur lors de la mise à jour des informations de facturation: ', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de facturation: ', error);
    }
  };

  const handleDeleteFacturation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        nomFacturation: '',
        prenomFacturation: '',
        adresseFacturation: '',
        codePostalFacturation: null,
        villeFacturation: '',
        paysFacturation: '',
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountFac({
          ...accountFac,
          nom_facturation: formDataFacturation.nomFacturation,
          prenom_facturation: formDataFacturation.prenomFacturation,
          adresse_facturation: formDataFacturation.adresseFacturation,
          code_postal_facturation: formDataFacturation.codePostalFacturation,
          ville_facturation: formDataFacturation.villeFacturation,
          pays_facturation: formDataFacturation.paysFacturation,
        });
        setSuccessMessageFacturation('Les informations de facturation ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageFacturation(null);
        }, 2000);
      } else {
        console.error('Erreur lors de la mise à jour des informations de facturation: ', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de facturation: ', error);
    }
  };

  const handleDeleteAdresse = async () => {
    try {
      await axios.delete(`http://airneis.ddns.net:3000/delete_info_livraison.php?id=${selectedAdresseId}`);
      const updatedAccountInfo = accountInfo.filter((adresse) => adresse.id !== selectedAdresseId);
      setAccountInfo(updatedAccountInfo);
      setSelectedAdresseId("");
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'adresse: ', error);
    }
  };
 
  if (loading) {
    return <div>Chargement...</div>;
  }


  return (
    <>
      {isLoggedIn ? (
        <>
          <h1 className="mb-4 text-center">Livraison</h1>
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
                <h2 className='text-center'>Carnet d'adresses</h2>
                {successMessageLivraison && <div className='alert alert-success'>{successMessageLivraison}</div>}
                {successMessageFacturation && <div className='alert alert-success'>{successMessageFacturation}</div>}
                <br />
                {editModeLivraison && (
                  <div>
                    <h3>Adresse de livraison</h3>
                    <form onSubmit={handleSubmitLivraison}>
                      <div>
                        <label>Nom de l'adresse:</label>
                        <input type='text' name='nomAdresse' value={formDataLivraison.nomAdresse} onChange={handleInputChangeLivraison} required />
                      </div>
                      <div>
                        <label>Nom:</label>
                        <input type='text' name='nom' value={formDataLivraison.nom} onChange={handleInputChangeLivraison} required />
                      </div>
                      <div>
                        <label>Prénom:</label>
                        <input type='text' name='prenom' value={formDataLivraison.prenom} onChange={handleInputChangeLivraison} required />
                      </div>
                      <div>
                        <label>Adresse:</label>
                        <input type='text' name='adresseLivraison' value={formDataLivraison.adresseLivraison} onChange={handleInputChangeLivraison} required />
                      </div>
                      <div>
                        <label>Adresse 2 (optionnel):</label>
                        <input type='text' name='adresseLivraison2' value={formDataLivraison.adresseLivraison2} onChange={handleInputChangeLivraison} />
                      </div>
                      <div>
                        <label>Code postal:</label>
                        <input type='text' name='codePostalLivraison' value={formDataLivraison.codePostalLivraison} onChange={handleInputChangeLivraison} required />
                      </div>
                      <div>
                        <label>Ville:</label>
                        <input type='text' name='villeLivraison' value={formDataLivraison.villeLivraison} onChange={handleInputChangeLivraison} required />
                      </div>
                      <div>
                        <label>Pays:</label>
                        <input type='text' name='pays' value={formDataLivraison.pays} onChange={handleInputChangeLivraison} required />
                      </div>
                      <br />
                      <div className='text-center'>
                        <button type='submit' className='btn-custom btn-custom-right'>Enregistrer 💾</button>
                        <button type='button' className='btn-custom btn-custom-right' onClick={handleCancelLivraison}>Annuler ❌</button>
                    </div>
                    </form>
                  </div>
                )}
                {editModeFacturation && (
                  <div>
                    <h3>Adresse de facturation</h3>
                    <form onSubmit={handleSubmitFacturation}>
                      <div>
                        <label>Nom:</label>
                        <input type='text' name='nomFacturation' value={formDataFacturation.nomFacturation} onChange={handleInputChangeFacturation} required />
                      </div>
                      <div>
                        <label>Prénom:</label>
                        <input type='text' name='prenomFacturation' value={formDataFacturation.prenomFacturation} onChange={handleInputChangeFacturation} required />
                      </div>
                      <div>
                        <label>Adresse:</label>
                        <input type='text' name='adresseFacturation' value={formDataFacturation.adresseFacturation} onChange={handleInputChangeFacturation} required />
                      </div>
                      <div>
                        <label>Code postal:</label>
                        <input type='text' name='codePostalFacturation' value={formDataFacturation.codePostalFacturation} onChange={handleInputChangeFacturation} required />
                      </div>
                      <div>
                        <label>Ville:</label>
                        <input type='text' name='villeFacturation' value={formDataFacturation.villeFacturation} onChange={handleInputChangeFacturation} required />
                      </div>
                      <div>
                        <label>Pays:</label>
                        <input type='text' name='paysFacturation' value={formDataFacturation.paysFacturation} onChange={handleInputChangeFacturation} required />
                      </div>
                      <br />
                      <div className='text-center'>
                        <button type='submit' className='btn-custom btn-custom-right'>Enregistrer 💾</button>
                        <button type='button' className='btn-custom btn-custom-right' onClick={handleCancelFacturation}>Annuler ❌</button>
                      </div>
                    </form>
                  </div>
                )}
                {!editModeLivraison && !editModeFacturation && (
                  <div>
                    <div>
                      <h3>Adresse de livraison</h3>
                      {accountInfo.length > 0 ? (
                        <div>
                          <select value={selectedAdresseId} onChange={(e) => handleChangeAdresse(e)} className="custom-select-liv">
                            <option value="">Sélectionner une adresse</option>
                            {accountInfo.map((adresse) => (
                              <option key={adresse.id} value={adresse.id}>{adresse.nom_adresse}</option>
                            ))}
                          </select>
                          {selectedAdresseId !== "" && (
                            <div>
                              <p>Nom de l'adresse: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom_adresse} </strong></p>
                              <p>Nom: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom}</strong> </p>
                              <p>Prénom: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).prenom}</strong></p>
                              <p>Adresse: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse1}</strong></p>
                              <p>Adresse 2: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse2}</strong></p>
                              <p>Code postal:<strong> {accountInfo.find((adresse) => adresse.id === selectedAdresseId).code_postal}</strong></p>
                              <p>Ville: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).ville}</strong></p>
                              <p>Pays: <strong>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).pays}</strong></p>
                              <center>
                                <button type='button' className='btn-custom btn-custom-right' onClick={handleEditLivraison}>Modifier ⚙️</button>
                                <button type='button' className='btn-custom btn-custom-right' onClick={handleDeleteAdresse}>Supprimer ⛒</button>
                              </center>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                        <p>Aucune adresse de livraison enregistrée</p>
                      </div>
                      )}
                    </div>
                    <br />
                    <center>
                      <button type='button' className='btn-custom ' onClick={handleAjoutLivraison}>Ajouter une adresse</button>
                    </center>
                    <br />
                    <div>
                      <h3>Adresse de facturation</h3>
                      {accountFac.nom_facturation || accountFac.prenom_facturation || accountFac.pays_facturation || accountFac.adresse_facturation || accountFac.code_postal_facturation || accountFac.ville_facturation ? (
                        <div>
                        <p>Nom: <strong>{accountFac.nom_facturation}</strong></p>
                        <p>Prénom: <strong>{accountFac.prenom_facturation}</strong></p>
                        <p>Adresse: <strong>{accountFac.adresse_facturation}</strong></p>
                        <p>Code postal: <strong>{accountFac.code_postal_facturation}</strong></p>
                        <p>Ville: <strong>{accountFac.ville_facturation}</strong></p>
                        <p>Pays: <strong>{accountFac.pays_facturation}</strong></p>
                        <center>
                          <div className='d-flex justify-content-center'>
                          <button type='button' className='btn-custom btn-custom-right' onClick={handleEditFacturation}>Modifier ⚙️</button>
                          <button type='button' className='btn-custom btn-custom-right' onClick={handleDeleteFacturation}>Supprimer ⛒</button>
                          </div>
                        </center>
                      </div>
                      ) : (
                        <div>
                        <p>Aucune adresse de facturation enregistrée.</p>
                        <center>
                          <button type='button' className='btn-custom align-item-center' onClick={handleEditFacturation}>Ajouter une adresse</button>
                        </center>
                      </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="item-align-center">
              {errorMessage && (
                <p className="text-center erreurPanier">{errorMessage}</p>
              )}
              <div className="d-flex justify-content-between">
                <NavLink to='/Panier' className='btn-custom link-custom'>
                  Retour
                </NavLink>
                <button className="btn-continuer" onClick={handlePayer}>
                  CONTINUER
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

export default Livraison;
