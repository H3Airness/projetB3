import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Menu from '../Menu';

function Produit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
        <Menu/>

        <center>
            <h1>{product.nom}</h1>
            <p>{product.description}</p>
            <img src={product.source} alt={product.titre} />
            <p>{product.prix}€</p>
        </center>
    </>
  );
};
export default Produit;
