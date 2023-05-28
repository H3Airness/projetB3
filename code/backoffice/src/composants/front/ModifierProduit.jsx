import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

function ModifierProduit() {
  const { isLoggedIn } = useContext(AuthContext);
  const [responseName, setResponseName] = useState('');
  const [responseDescription, setResponseDescription] = useState('');
  const [responsePrix, setResponsePrix] = useState('');
  const [responseCategorie, setResponseCategorie] = useState('');
  const [responseImage, setResponseImage] = useState('');
  const [responseStock, setResponseStock] = useState('');
  const { id } = useParams();
  const [categorie, setCategorie] = useState([]);
  const [categories, setCategories] = useState([]);
  const [produit, setProduct] = useState(null);

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

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
            setCategorie(response.data);
          })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmitName = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseName(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitDescription = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseDescription(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitPrix = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponsePrix(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitCategorie = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseCategorie(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitImage = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseImage(response.data))
      .catch(error => console.log(error));
  };

  const handleSubmitStock = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post(`http://airneis.ddns.net:3000/modifier_produit.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => setResponseStock(response.data))
      .catch(error => console.log(error));
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {categorie.length > 0 && categorie[0] && (
            <div className="card" key={produit.id}>
              <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier le produit: {produit.nom}</div>

                <hr/>
              
                <form onSubmit={handleSubmitName} method="post">
                  {responseName && <p className='ReponseFormulaire text-center mt-3'>{responseName.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="nom">Modifier le nom du produit:</label>
                    <input required name="nom" id="nom" type="text" placeholder={produit.nom} defaultValue={produit.nom} />

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier le nom" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitDescription} method="post">
                  {responseDescription && <p className='ReponseFormulaire text-center mt-3'>{responseDescription.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="description">Modifier la description du produit:</label>
                    <input required name="description" id="description" type="text" placeholder={produit.description} defaultValue={produit.description} />

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier la descritpion" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitPrix} method="post">
                  {responsePrix && <p className='ReponseFormulaire text-center mt-3'>{responsePrix.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="prix">Modifier le prix du produit:</label>
                    <input type="number" name="prix" id="prix" min="0" step="0.01" placeholder={produit.prix} defaultValue={produit.prix} required/>

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier le prix" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitCategorie}>
                  {responseCategorie && <p className='ReponseFormulaire text-center mt-3'>{responseCategorie.message}</p>}
                  <div className='mb-4'>
                    <label htmlFor="choix-item">Selectionnez une catégorie: &emsp;</label>
                    <select name="select" id="categorie" required placeholder={produit.categorie} defaultValue={produit.categorie}>
                      {categories.map(categories => (
                        <option value={categories.id_categorie} key={categories.id_categorie}>{categories.nom}</option>
                      ))}
                    </select> 
                    <input type="hidden" name="id" value={produit.id} />       
                  </div>
                  <input value="Modifier la catégorie" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitImage}>
                  {responseImage && <p className='ReponseFormulaire text-center mt-3'>{responseImage.message}</p>}
                  <div className='mb-4'>
                    <label htmlFor="image">Image actuelle:</label>
                    <center>
                      <img className='mb-3' src={`http://airneis.ddns.net:3000/img_produit/${produit.id}.jpg`} alt={produit.nom} style={{ width: '200px' }} />
                    </center>
                    <input type="file" id="image" name="image" />  
                    <input type="hidden" name="id" value={produit.id} />      
                  </div>
                  <input value="Modifier l'image" type="submit" />
                </form>

                <br/>
                <hr/>
                <br/>

                <form onSubmit={handleSubmitStock} method="post">
                  {responseStock && <p className='ReponseFormulaire text-center mt-3'>{responseStock.message}</p>}

                  <div className="card-group mb-4">
                    <label htmlFor="stock">Modifier le stock du produit:</label>
                    <input type="number" name="stock" id="stock" min="0" placeholder={produit.stock} defaultValue={produit.stock} required/>

                    <input type="hidden" name="id" value={produit.id} />
                  </div>
                  <input value="Modifier le stock" type="submit" />
                </form>

              </div>
            </div>
          )}
          <div className="d-flex justify-content-center my-3">
            <NavLink to="/articles" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaires de produit </NavLink>
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
