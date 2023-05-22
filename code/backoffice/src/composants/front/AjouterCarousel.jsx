import { NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function AjouterCarousel() {
  const { isLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('image', image, 'image.jpg');
  
    try {
        const response = await axios.post('http://airneis.ddns.net:3000/carousel/ajout_carousel.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponse('Image ajoutée avec succès');
      }
    catch (error) {
    console.log(error);
    setResponse('Erreur lors de l\'envoi des données');
    }
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <> 
      {isLoggedIn ? (
            <>
              <div className="categorie-card">
                <div className="card-header">
                  <div className="card-title text-center display-5 mb-5 ContactTitre">Ajouter une image:</div>
                </div>
                <form onSubmit={handleSubmit}>
                {response && <p className='ReponseFormulaire text-center mt-3'>{response}</p>}

                  <div className='mb-4'>
                    <label htmlFor="image">Icon (de préférence en 300x300 au format jpg):</label>
                    <input type="file" id="image" onChange={handleImageChange} />
                  </div>

                  <input value="Ajouter" type="submit" />
                </form>
              </div>

              <div className="d-flex justify-content-center my-3">
                <NavLink to="/carousel" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de catégorie </NavLink>
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

export default AjouterCarousel;
