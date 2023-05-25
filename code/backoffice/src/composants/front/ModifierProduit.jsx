import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function ModifierProduit() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responseName, setResponseName] = useState('');
  const [responseIcon, setResponseIcon] = useState('');
  const [responseBanniere, setResponseBanniere] = useState('');
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [produit, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.categorie);
        setProduct(data);
        if (data && data.categorie) {
          axios.get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${data.categorie}`)
          .then(response => {
            console.log(response.data);
            setCategories(response.data);
          })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmitName = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/categorie/modifier_nom_categorie.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseName(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitIcon = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/categorie/modifier_icon_categorie.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseIcon(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitBanniere = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/categorie/modifier_banniere_categorie.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseBanniere(response.data))
      .catch(error => console.log(error));
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {categories.length > 0 && categories[0] && (
            <div className="card" key={produit.id}>
              <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier le produit: {produit.nom}</div>

                <hr/>
              
                <form onSubmit={handleSubmitName} method="post">
                  {responseName && <p className='ReponseFormulaire text-center mt-3'>{responseName.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="nom">Modifier le nom de du produit:</label>
                    <input required name="nom" id="nom" type="text" placeholder={produit.nom} defaultValue={produit.nom} />

                    <input type="hidden" name="id" value={produit.id} />
                    <input type="hidden" name="ancienNom" value={produit.nom} />
                  </div>
                  <input value="Modifier le nom de la catégorie" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitIcon}>
                  {responseIcon && <p className='ReponseFormulaire text-center mt-3'>{responseIcon.message}</p>}
                  <div className='mb-4'>
                    <label htmlFor="icon">Image actuelle:</label>
                    <center>
                      <img src={`http://airneis.ddns.net:3000/img_produit/${produit.id}.jpg`} alt={produit.nom} style={{ width: '100px' }} />
                    </center>
                    <input type="file" id="icon" name="icon" />  
                    <input type="hidden" name="id" id="id" value={produit.id} />       
                  </div>
                  <input value="Modifier l'icône" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitBanniere}>
                  {responseBanniere && <p className='ReponseFormulaire text-center mt-3'>{responseBanniere.message}</p>}
                  <div className='mb-4'>
                    <label htmlFor="banniere">Bannière actuelle:</label>
                    <center>
                      <img src={`http://airneis.ddns.net:3000/img_categorie/${produit.id}banniere.jpg`} alt={produit.nom} style={{ width: '500px' }} />
                    </center>
                    <input type="file" id="banniere" name="banniere" />
                    <input type="hidden" name="id" id="id" value={produit.id} />        
                  </div>
                  <input value="Modifier la bannière" type="submit" />
                </form>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-center my-3">
            <NavLink to="/categorie" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de produit </NavLink>
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
  
export default ModifierProduit;
