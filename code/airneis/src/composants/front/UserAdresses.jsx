import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";

function UserAdresses() {
  const [loading, setLoading] = useState(true);
  const { accountId } = useContext(AuthContext);
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
        id : selectedAdresseId,
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
              <label>Choisir l'adresse :</label>
              <select value={selectedAdresseId} onChange={(e) => setSelectedAdresseId(e.target.value)}>
                <option value="">Sélectionner une adresse</option>
                {accountInfo.map((adresse) => (
                  <option key={adresse.id} value={adresse.id}>{adresse.nom_adresse}</option>
                ))}
              </select>
            </div>
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
            {accountInfo.length > 0 ? (
              <div>
                <select value={selectedAdresseId} onChange={(e) => setSelectedAdresseId(e.target.value)}>
                  <option value="">Sélectionner une adresse</option>
                  {accountInfo.map((adresse) => (
                    <option key={adresse.id} value={adresse.id}>{adresse.nom_adresse}</option>
                  ))}
                </select>
                {selectedAdresseId !== "" && (
                  <div>
                    <p>Nom de l'adresse: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom_adresse}</p>
                    <p>Nom: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom}</p>
                    <p>Prénom: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).prenom}</p>
                    <p>Adresse: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse1}</p>
                    <p>Adresse 2: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse2}</p>
                    <p>Code postal: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).code_postal}</p>
                    <p>Ville: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).ville}</p>
                    <p>Pays: {accountInfo.find((adresse) => adresse.id === selectedAdresseId).pays}</p>
                    <center>
                      <button type='button' className='btn btn-primary' onClick={handleEditLivraison}>Ajouter</button>
                      <button type='button' className='btn btn-warning' onClick={handleEditLivraison}>Modifier</button>
                    </center>
                  </div>
                )}
              </div>
            ) : (
              <div>
              <p>Aucune adresse de livraison disponible pour ce compte.</p>
              <center>
                <button type='button' className='btn btn-primary' onClick={handleEditLivraison}>Ajouter</button>
              </center>
            </div>
            )}
          </div>
          <br />
          <div>
            <h3>Adresse de facturation</h3>
            {accountFac.nom_facturation || accountFac.prenom_facturation || accountFac.pays_facturation || accountFac.adresse_facturation || accountFac.code_postal_facturation || accountFac.ville_facturation ? (
              <div>
              <p>Nom: {accountFac.nom_facturation}</p>
              <p>Prénom: {accountFac.prenom_facturation}</p>
              <p>Adresse: {accountFac.adresse_facturation}</p>
              <p>Code postal: {accountFac.code_postal_facturation}</p>
              <p>Ville: {accountFac.ville_facturation}</p>
              <p>Pays: {accountFac.pays_facturation}</p>
              <center>
                <button type='button' className='btn btn-warning' onClick={handleEditFacturation}>Modifier</button>
              </center>
            </div>
            ) : (
              <div>
              <p>Aucune adresse de facturation disponible pour ce compte.</p>
              <center>
                <button type='button' className='btn btn-primary align-item-center' onClick={handleEditFacturation}>Ajouter</button>
              </center>
            </div>
            )}
          </div>
        </div>
      )}
      <br />
      <div className='text-center'>
        <Link to='/'>Retour</Link>
      </div>
    </div>
  );
}

export default UserAdresses;
