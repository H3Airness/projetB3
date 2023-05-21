import { NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function AjouterCategorie() {
  const { isLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState('');
  const [nom, setNom] = useState('');
  const [icon, setIcon] = useState(null);
  const [banniere, setBanniere] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('icon', icon, 'icon.jpg');
    formData.append('banniere', banniere, 'banniere.jpg');
  
    try {
      // Requête GET pour vérifier le nom de catégorie
      const response = await axios.get(`http://airneis.ddns.net:3000/categorie/verifier_categorie.php?nom=${nom}`);
  
      if (response.data.error) {
        // Le nom de catégorie existe déjà, afficher l'erreur
        setResponse(response.data.error);
      } else {
        // Le nom de catégorie n'existe pas, procéder aux requêtes d'envoi des images
        // Requête vers la première API
        const response1 = await axios.post('http://airneis.ddns.net:3000/categorie/creation_categorie.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Requête vers la deuxième API
        const response2 = await axios.post('http://airneis.ddns.net:3000/categorie/banniere_categorie.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        // Traiter les réponses des deux API
        setResponse('Données envoyées avec succès');
      }
    } catch (error) {
      console.log(error);
      setResponse('Erreur lors de l\'envoi des données');
    }
  };
  
  

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleIconChange = (e) => {
    setIcon(e.target.files[0]);
  };

  const handleBanniereChange = (e) => {
    setBanniere(e.target.files[0]);
  };

  return (
    <> 
      {isLoggedIn ? (
            <>
              <div className="categorie-card">
                <div className="card-header">
                  <div className="card-title text-center display-5 mb-5 ContactTitre">Création d'une catégorie:</div>
                </div>
                <form onSubmit={handleSubmit}>
                {response && <p className='ReponseFormulaire text-center mt-3'>{response}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="nom">Nom de la catégorie:</label>
                    <input required name="nom" id="nom" type="text" placeholder="Nom de la catégorie" onChange={handleNomChange} />
                  </div>

                  <div className='mb-4'>
                    <label htmlFor="icon">Icon (de préférence en 300x300 au format jpg):</label>
                    <input type="file" id="icon" onChange={handleIconChange} />
                  </div>

                  <div className='mb-4'>
                    <label htmlFor="banniere">Bannière :</label>
                    <input type="file" id="banniere" onChange={handleBanniereChange} />
                  </div>

                  <input value="Créer" type="submit" />
                </form>
              </div>

              <div className="d-flex justify-content-center my-3">
                <NavLink to="/categorie" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de catégorie </NavLink>
              </div>
            </>
          ) : (
            <>
                <Connexion/>
            </>
          )}
    </>
  );
}

export default AjouterCategorie;
