import { useParams } from 'react-router-dom';
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
          <img
            src={`http://airneis.ddns.net:3000/img/${categories[0].nom}/banniere.jpg`}
            alt={categories[0].nom}
            style={{ width: '100%' }}
          />
          <div className="ContactTitre">
            <p>{categories[0].nom}</p>
          </div>

          <center>
            <h1>{produit.nom}</h1>
            <p>{produit.description}</p>
            <img src={`http://airneis.ddns.net:3000/img/${produit.source}`} alt={produit.titre} />
            <p>{produit.prix}€</p>
            <button className="btn btn-primary" onClick={() => ajouter(produit) }>
              <span>Ajouter au panier</span>
            </button>
          </center>
        </>
      )}
    </>
  );
}

export default Produit;
