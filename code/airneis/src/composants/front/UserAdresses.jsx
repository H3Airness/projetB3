import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAdresses = ({ accountId }) => {
  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    adresseLivraison: '',
    codePostalLivraison: '',
    villeLivraison: '',
    pays: '',
  });

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setFormData({
      adresseLivraison: accountInfo.adresse_livraison,
      codePostalLivraison: accountInfo.code_postal_livraison,
      villeLivraison: accountInfo.ville_livraison,
      pays: accountInfo.pays,
    });
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update account data
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_livraison.php', {
        accountId,
        adresseLivraison: formData.adresseLivraison,
        codePostalLivraison: formData.codePostalLivraison,
        villeLivraison: formData.villeLivraison,
        pays: formData.pays,
      });
      if (response.data.status === 'success') {
        setEditMode(false);
        setAccountInfo({
          ...accountInfo,
          adresse_livraison: formData.adresseLivraison,
          code_postal_livraison: formData.codePostalLivraison,
          ville_livraison: formData.villeLivraison,
          pays: formData.pays,
        });
      } else {
        console.error('Erreur lors de la mise à jour des informations de livraison: ', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de livraison: ', error);
    }
  };

  if (loading) {
    return <div>Chargement...</div>
  }

  if (!accountInfo) {
    return <div>Impossible de charger les informations du compte</div>
  }

  return (
    <div>
      <h2 className='text-center'>Carnet d'adresses</h2>
      <br />
      <div>
        <h3>Adresse de livraison</h3>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Adresse:</label>
              <input type='text' name='adresseLivraison' value={formData.adresseLivraison} onChange={handleInputChange} />
            </div>
            <div>
              <label>Code postal:</label>
              <input type='text' name='codePostalLivraison' value={formData.codePostalLivraison} onChange={handleInputChange} />
            </div>
            <div>
              <label>Ville:</label>
              <input type='text' name='villeLivraison' value={formData.villeLivraison} onChange={handleInputChange} />
            </div>
            <div>
              <label>Pays:</label>
              <input type='text' name='pays' value={formData.pays} onChange={handleInputChange} />
            </div>
            <div>
              <button type='submit'>Enregistrer</button>
              <button type='button' onClick={handleCancel}>Annuler</button>
            </div>
          </form>
        ) : (
          <div>
            <p>Adresse: {accountInfo.adresse_livraison}</p>
            <p>Code postal: {accountInfo.code_postal_livraison}</p>
            <p>Ville: {accountInfo.ville_livraison}</p>
            <p>Pays: {accountInfo.pays}</p>
            <button onClick={handleEdit}>Modifier mon adresse de livraison</button>
          </div>
        )}
      </div>
      <div>
        <h3>Adresse de facturation</h3>
        {accountInfo.adresse_facturation ? (
          <div>
            <p>Adresse: {accountInfo.adresse_facturation}</p>
            <p>Code postal: {accountInfo.code_postal_facturation}</p>
            <p>Ville: {accountInfo.ville_facturation}</p>
            <p>Pays: {accountInfo.pays_facturation}</p>
          </div>
        ) : (
          <p>Aucune information de facturation n'est disponible pour ce compte.</p>
        )}
      </div>
    </div>
  );
};

export default UserAdresses;
