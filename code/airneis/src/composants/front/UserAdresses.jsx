import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function UserAdresses() {
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const location = useLocation();
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
  const [selectedAdresseId, setSelectedAdresseId] = useState(""); // Nouvel état pour stocker l'ID de l'adresse sélectionnée

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
        }, 3000);
        
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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

        <div className="mon-compte-container">
          <div className="sidebar-param">
            <h1 className="sidebar-title">Récapitulatif de votre compte</h1>
            <div>
              <h2 className='text-center'>Carnet d'adresses</h2>
              {successMessageLivraison && <div className='alert alert-success'>{successMessageLivraison}</div>}
              {successMessageFacturation && <div className='alert alert-success'>{successMessageFacturation}</div>}
              <br />
              <hr />
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
                          <select value={selectedAdresseId} onChange={(e) => setSelectedAdresseId(e.target.value)} className="custom-select">
                            <option value="">Sélectionner une adresse</option>
                            {accountInfo.map((adresse) => (
                            <option key={adresse.id} value={adresse.id}>{adresse.nom_adresse}</option>
                             ))}
                            </select>
                        {selectedAdresseId !== "" && (
                          <div className="adresse-container">
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
                  <center>
                    <br />
                        <button type='button' className='btn-custom' onClick={handleAjoutLivraison}>Ajouter une adresse</button>
                      </center>
                      
                  <br />
                  <div>
                    <hr />
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
              <br />
              <hr />
              <div className="d-flex">
                <NavLink to='/MesParametres' className='btn-custom link-custom my-3'>
                  Retour
                </NavLink>
              </div>
            </div>
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

export default UserAdresses;
