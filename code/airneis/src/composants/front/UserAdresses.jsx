import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function UserAdresses() {
  const [loading, setLoading] = useState(true);
  const { accountId } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState({});
  const [accountFac, setAccountFac] = useState({});
  const [editModeLivraison, setEditModeLivraison] = useState(false);
  const [formDataLivraison, setFormDataLivraison] = useState({
    nomAdresse: '',
    nom: '',
    prenom: '',
    adresseLivraison: '',
    adresseLivraison2: '', // Champ Adresse 2 ajouté
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch account data
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
    setEditModeFacturation(false); // Assure que seule la partie Livraison est en mode édition
    setFormDataLivraison({
      nomAdresse: accountInfo.nom_adresse,
      nom: accountInfo.nom,
      prenom: accountInfo.prenom,
      adresseLivraison: accountInfo.adresse1,
      adresseLivraison2: accountInfo.adresse2, // Champ Adresse 2 ajouté
      codePostalLivraison: accountInfo.code_postal,
      villeLivraison: accountInfo.ville,
      pays: accountInfo.pays,
    });
    setFormDataFacturation({
      nomFacturation:'',
      prenomFacturation:'',
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
      nomFacturation: accountFac.nom_facturation,
      prenomFacturation: accountFac.prenom_facturation,
      adresseFacturation: accountFac.adresse_facturation,
      codePostalFacturation: accountFac.code_postal_facturation,
      villeFacturation: accountFac.ville_facturation,
      paysFacturation: accountFac.pays_facturation,
    });
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '', // Champ Adresse 2 ajouté
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
        nomAdresse: formDataLivraison.nomAdresse,
        nom: formDataLivraison.nom,
        prenom: formDataLivraison.prenom,
        adresseLivraison: formDataLivraison.adresseLivraison,
        adresseLivraison2: formDataLivraison.adresseLivraison2, // Champ Adresse 2 inclus
        codePostalLivraison: formDataLivraison.codePostalLivraison,
        villeLivraison: formDataLivraison.villeLivraison,
        pays: formDataLivraison.pays,
      });
      if (response.data.status === 'success') {
        setEditModeLivraison(false);
        setAccountInfo({
          ...accountInfo,
          nom_adresse: formDataLivraison.nomAdresse,
          nom: formDataLivraison.nom,
          prenom: formDataLivraison.prenom,
          adresse1: formDataLivraison.adresseLivraison,
          adresse2: formDataLivraison.adresseLivraison2, // Champ Adresse 2 inclus
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

  if (loading) {
    return <div>Chargement...</div>;
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
              <label>Nom de l'adresse:</label>
              <input type='text' name='nomAdresse' value={formDataLivraison.nomAdresse} defaultValue={accountInfo.nom_adresse} onChange={handleInputChangeLivraison} required />
            </div>
            <div>
              <label>Nom:</label>
              <input type='text' name='nom' value={formDataLivraison.nom} defaultValue={accountInfo.nom} onChange={handleInputChangeLivraison} required />
            </div>
            <div>
              <label>Prénom:</label>
              <input type='text' name='prenom' value={formDataLivraison.prenom} defaultValue={accountInfo.prenom} onChange={handleInputChangeLivraison} required />
            </div>
            <div>
              <label>Adresse:</label>
              <input type='text' name='adresseLivraison' value={formDataLivraison.adresseLivraison} defaultValue={accountInfo.adresse1} onChange={handleInputChangeLivraison} required />
            </div>
            <div>
              <label>Adresse 2 (optionnel):</label>
              <input type='text' name='adresseLivraison2' value={formDataLivraison.adresseLivraison2} defaultValue={accountInfo.adresse2} onChange={handleInputChangeLivraison} />
            </div>
            <div>
              <label>Code postal:</label>
              <input type='text' name='codePostalLivraison' value={formDataLivraison.codePostalLivraison} defaultValue={accountInfo.code_postal} onChange={handleInputChangeLivraison} required />
            </div>
            <div>
              <label>Ville:</label>
              <input type='text' name='villeLivraison' value={formDataLivraison.villeLivraison} defaultValue={accountInfo.ville} onChange={handleInputChangeLivraison} required />
            </div>
            <div>
              <label>Pays:</label>
              <input type='text' name='pays' value={formDataLivraison.pays} defaultValue={accountInfo.pays} onChange={handleInputChangeLivraison} required />
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
              <label>Nom:</label>
              <input type='text' name='nomFacturation' value={formDataFacturation.nomFacturation} defaultValue={accountFac.nom_facturation} onChange={handleInputChangeFacturation} required />
            </div>
            <div>
              <label>Prenom:</label>
              <input type='text' name='prenomFacturation' value={formDataFacturation.prenomFacturation} defaultValue={accountFac.prenom_facturation} onChange={handleInputChangeFacturation} required />
            </div>
            <div>
              <label>Adresse:</label>
              <input type='text' name='adresseFacturation' value={formDataFacturation.adresseFacturation} defaultValue={accountFac.adresse_facturation} onChange={handleInputChangeFacturation} required />
            </div>
            <div>
              <label>Code postal:</label>
              <input type='text' name='codePostalFacturation' value={formDataFacturation.codePostalFacturation} defaultValue={accountFac.code_postal_facturation} onChange={handleInputChangeFacturation} required />
            </div>
            <div>
              <label>Ville:</label>
              <input type='text' name='villeFacturation' value={formDataFacturation.villeFacturation} defaultValue={accountFac.ville_facturation} onChange={handleInputChangeFacturation} required />
            </div>
            <div>
              <label>Pays:</label>
              <input type='text' name='paysFacturation' value={formDataFacturation.paysFacturation} defaultValue={accountFac.pays_facturation} onChange={handleInputChangeFacturation} required />
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
            {accountInfo.adresse1 ? (
              <div>
                <p>Nom de l'adresse: {accountInfo.nom_adresse}</p>
                <p>Nom: {accountInfo.nom}</p>
                <p>Prénom: {accountInfo.prenom}</p>
                <p>Adresse: {accountInfo.adresse1}</p>
                {accountInfo.adresse2 && <p>Adresse 2: {accountInfo.adresse2}</p>} {/* Affichage Adresse 2 si disponible */}
                <p>Code postal: {accountInfo.code_postal}</p>
                <p>Ville: {accountInfo.ville}</p>
                <p>Pays: {accountInfo.pays}</p>
                <div className='text-center'>
                  <button className='btn btn-primary' onClick={handleEditLivraison}>Modifier mon adresse de livraison</button>
                </div>
              </div>
            ) : (
              <div>
                <p>Aucune adresse de livraison n'est disponible pour ce compte.</p>
                <div className='text-center'>
                  <button className='btn btn-primary' onClick={handleEditLivraison}>Ajouter une adresse de livraison</button>
                </div>
              </div>
            )}
          </div>
          <div>
            <h3>Adresse de facturation</h3>
            {accountFac.adresse_facturation ? (
              <div>
                <p>Nom: {accountFac.nom_facturation}</p>
                <p>Prénom: {accountFac.prenom_facturation}</p>
                <p>Adresse: {accountFac.adresse_facturation}</p>
                <p>Code postal: {accountFac.code_postal_facturation}</p>
                <p>Ville: {accountFac.ville_facturation}</p>
                <p>Pays: {accountFac.pays_facturation}</p>
                <div className='text-center'>
                  <button className='btn btn-primary' onClick={handleEditFacturation}>Modifier mon adresse de facturation</button>
                </div>
              </div>
            ) : (
              <div>
                <p>Aucune adresse de facturation n'est disponible pour ce compte.</p>
                <div className='text-center'>
                  <button className='btn btn-primary' onClick={handleEditFacturation}>Ajouter une adresse de facturation</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className='text-right'>
        <Link to='/' className='btn btn-secondary'>Retour</Link>
      </div>
    </div>
  );
}

export default UserAdresses;
