import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext"

function Produit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const {ajouter} = useContext(dataContext)

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <center>
        <h1>{product.nom}</h1>
        <p>{product.description}</p>
        <img src={product.source} alt={product.titre} />
        <p>{product.prix}€</p>
        <button className="btn btn-primary" onClick={() => ajouter(product) }>
          <span>Ajouter au panier</span>
        </button>
      </center>
    </>
  );
}

export default Produit;
