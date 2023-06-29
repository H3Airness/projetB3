import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function UserAdresses () {
  const [loading, setLoading] = useState(true);
  const { accountId } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState(null);
  const [editModeLivraison, setEditModeLivraison] = useState(false);
  const [formDataLivraison, setFormDataLivraison] = useState({
    adresseLivraison: '',
    codePostalLivraison: '',
    villeLivraison: '',
    pays: '',
  });
  const [editModeFacturation, setEditModeFacturation] = useState(false);
  const [formDataFacturation, setFormDataFacturation] = useState({
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
        // Fetch account data
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountInfo(accountRes.data.accountLivraison);
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
    setEditModeFacturation(false); // Assure que seule la partie Livraison est en mode édition
    setFormDataLivraison({
      adresseLivraison: accountInfo.adresse_livraison,
      codePostalLivraison: accountInfo.code_postal_livraison,
      villeLivraison: accountInfo.ville_livraison,
      pays: accountInfo.pays,
    });
    setFormDataFacturation({
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };

  const handleEditFacturation = () => {
    setEditModeFacturation(true);
    setEditModeLivraison(false); // Assure que seule la partie Facturation est en mode édition
    setFormDataFacturation({
      adresseFacturation: accountInfo.adresse_facturation,
      codePostalFacturation: accountInfo.code_postal_facturation,
      villeFacturation: accountInfo.ville_facturation,
      paysFacturation: accountInfo.pays_facturation,
    });
    setFormDataLivraison({
      adresseLivraison: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
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
      // Update account data
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_livraison.php', {
        accountId,
        adresseLivraison: formDataLivraison.adresseLivraison,
        codePostalLivraison: formDataLivraison.codePostalLivraison,
        villeLivraison: formDataLivraison.villeLivraison,
        pays: formDataLivraison.pays,
      });
      if (response.data.status === 'success') {
        setEditModeLivraison(false);
        setAccountInfo({
          ...accountInfo,
          adresse1: formDataLivraison.adresseLivraison,
          code_postal: formDataLivraison.codePostalLivraison,
          ville: formDataLivraison.villeLivraison,
          pays: formDataLivraison.pays,
        });
        setSuccessMessageLivraison('Les informations de livraison ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageLivraison(null);
        }, 2000);
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
      // Update account data
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        adresseFacturation: formDataFacturation.adresseFacturation,
        codePostalFacturation: formDataFacturation.codePostalFacturation,
        villeFacturation: formDataFacturation.villeFacturation,
        paysFacturation: formDataFacturation.paysFacturation,
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountInfo({
          ...accountInfo,
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

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!accountInfo) {
    return <div>Impossible de charger les informations du compte</div>;
  }

  return (
    <div>
      <h2 className='text-center'>Carnet d'adresses</h2>
      {successMessageLivraison && <div className='alert alert-success'>{successMessageLivraison}</div>}
      {successMessageFacturation && <div className='alert alert-success'>{successMessageFacturation}</div>}
      <br />
      {editModeLivraison && (
        <div>
          <h3>Adresse de livraison</h3>
          <form onSubmit={handleSubmitLivraison}>
            <div>
              <label>Adresse:</label>
              <input type='text' name='adresseLivraison' value={formDataLivraison.AdresseLivraison} defaultValue={accountInfo.adresse1} onChange={handleInputChangeLivraison} />
            </div>
            <div>
              <label>Code postal:</label>
              <input type='text' name='codePostalLivraison' value={formDataLivraison.code_postal} defaultValue={accountInfo.code_postal} onChange={handleInputChangeLivraison} />
            </div>
            <div>
              <label>Ville:</label>
              <input type='text' name='villeLivraison' value={formDataLivraison.ville} defaultValue={accountInfo.ville} onChange={handleInputChangeLivraison} />
            </div>
            <div>
              <label>Pays:</label>
              <input type='text' name='pays' value={formDataLivraison.pays} defaultValue={accountInfo.pays} onChange={handleInputChangeLivraison} />
            </div>
            <br />
            <div className='text-center'>
              <button type='submit' className='btn btn-primary'>Enregistrer</button>
              <button type='button' className='btn btn-secondary' onClick={handleCancelLivraison}>Annuler</button>
            </div>
          </form>
        </div>
      )}
      {editModeFacturation && (
        <div>
          <h3>Adresse de facturation</h3>
          <form onSubmit={handleSubmitFacturation}>
            <div>
              <label>Adresse:</label>
              <input type='text' name='adresseFacturation' value={formDataFacturation.adresseFacturation} onChange={handleInputChangeFacturation} />
            </div>
            <div>
              <label>Code postal:</label>
              <input type='text' name='codePostalFacturation' value={formDataFacturation.codePostalFacturation} onChange={handleInputChangeFacturation} />
            </div>
            <div>
              <label>Ville:</label>
              <input type='text' name='villeFacturation' value={formDataFacturation.villeFacturation} onChange={handleInputChangeFacturation} />
            </div>
            <div>
              <label>Pays:</label>
              <input type='text' name='paysFacturation' value={formDataFacturation.paysFacturation} onChange={handleInputChangeFacturation} />
            </div>
            <br />
            <div className='text-center'>
              <button type='submit' className='btn btn-primary'>Enregistrer</button>
              <button type='button' className='btn btn-secondary' onClick={handleCancelFacturation}>Annuler</button>
            </div>
          </form>
        </div>
      )}
      {!editModeLivraison && !editModeFacturation && (
        <div>
          <div>
            <h3>Adresse de livraison</h3>
            <p>Adresse: {accountInfo.adresse1}</p>
            <p>Code postal: {accountInfo.code_postal}</p>
            <p>Ville: {accountInfo.ville}</p>
            <p>Pays: {accountInfo.pays}</p>
            <div className='text-center'>
              <button className='btn btn-primary' onClick={handleEditLivraison}>Modifier mon adresse de livraison</button>
            </div>
          </div>
          <div>
            <h3>Adresse de facturation</h3>
            {accountInfo.adresse_facturation ? (
              <div>
                <p>Adresse: {accountInfo.adresse_facturation}</p>
                <p>Code postal: {accountInfo.code_postal_facturation}</p>
                <p>Ville: {accountInfo.ville_facturation}</p>
                <p>Pays: {accountInfo.pays_facturation}</p>
                <div className='text-center'>
                  <button className='btn btn-primary' onClick={handleEditFacturation}>Modifier mon adresse de facturation</button>
                </div>
              </div>
            ) : (
              <p>Aucune information de facturation n'est disponible pour ce compte.</p>
            )}
          </div>
        </div>
      )}
      <div className='text-right'>
        <Link to='/' className='btn btn-secondary'>Retour</Link>
      </div>
    </div>
  );
};

export default UserAdresses;
