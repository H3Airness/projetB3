import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext"

function Produit() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [produit, setProduct] = useState(null);
  const {ajouter} = useContext(dataContext)

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
  

  if (!produit) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      {categories.length > 0 && categories[0] && (
        <>
        <Link to={`/Categorie/${categories[0].id_categorie}`}>
          <img
            className='mb-5'
            src={`http://airneis.ddns.net:3000/img_categorie/${categories[0].id_categorie}banniere.jpg`}
            alt={categories[0].nom}
            style={{ width: '100%' }}
          />
        </Link>


          <div className="cat">

            <div>
              <img className='mb-5' src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`} alt={produit.titre} style={{ width: '500px' }}/>
            </div>

            <div className='description'>
              <div className="cat d-flex justify-content-between">
                <div className="prix">{produit.prix}€</div>
                <div className="titreProduit">{produit.nom}</div>
              </div>

              <div className="d-flex justify-content-end">
                {produit.stock > 0 ? (
                  <p className='text-success'>En stock</p>
                ) : (
                  <p className='text-danger'>Stock épuisé</p>
                )}
              </div>
              
              <p>{produit.description}</p>
              <center>
                {produit.stock > 0 ? (
                  <button className="btn btn-primary" onClick={() => ajouter(produit) }>
                    <span>Ajouter au panier</span>
                  </button>
                ) : (
                  <button className="btn btn-danger">
                    <span>Stock épuisé</span>
                  </button>
                )}
              </center>
            </div>

          </div>

          <p className='mt-5 info-airneis'>Produit similaires</p>
        </>
      )}
    </>
  );
}

export default Produit;
