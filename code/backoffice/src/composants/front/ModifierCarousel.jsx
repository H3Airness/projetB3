import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function ModifierCategorie() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responseIcon, setResponseIcon] = useState('');
  const { id } = useParams();

  const handleSubmitIcon = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/carousel/modifier_carousel.php`, formData)
      .then(response => setResponseIcon(response.data))
      .catch(error => console.log(error));
  };

  return (
    <>
      {isLoggedIn ? (
        <>
            <div className="categorie-card">
              <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier l'image:</div>
              </div>

              <form onSubmit={handleSubmitIcon}>
                {responseIcon && <p className='ReponseFormulaire text-center mt-3'>{responseIcon.message}</p>}
                <div className='mb-4'>
                  <label htmlFor="icon">Image actuelle:</label>
                  <center>
                    <img src={`http://airneis.ddns.net:3000/img/carousel/${id}.jpg`} alt={id} style={{ width: '500px' }} />
                  </center>
                  <input type="file" id="image" name="image" />  
                  <input type="hidden" name="id" id="id" value={id} />       
                </div>
                <input value="Modifier l'icône" type="submit" />
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
  
export default ModifierCategorie;
