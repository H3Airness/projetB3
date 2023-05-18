import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext"

function Produit() {
  const { id } = useParams();
  const [produit, setProduct] = useState(null);
  const {ajouter} = useContext(dataContext)

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!produit) {
    return <p>Chargement...</p>;
  }

  return (
    <>
    <img src={`http://airneis.ddns.net:3000/img/${produit.categorie}/banniere.jpg`} alt={produit.categorie} style={{ width: '100%' }}/>
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
  );
}

export default Produit;
