import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext"

function Categorie() {
    const { categorie } = useParams();
    const [product, setProduct] = useState(null);
    const { ajouter } = useContext(dataContext);
  
    useEffect(() => {
      fetch(`http://airneis.ddns.net:3000/categorie.php?categorie=${categorie}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error(error));
    }, [categorie]);
  
    if (!product) {
      return <p>Chargement...</p>;
    }
  
    return (
      <>
        <div className="container mt-4">
          <div className="row justify-content-center">
            {product.map((produit) => (
              <div className="col-md-4 mb-3" key={produit.id}>
                <div className="card">
                  <Link to={`/Produit/${produit.categorie}`}>
                    <img
                      className="card-img-top"
                      src={produit.source}
                      alt={produit.nom}
                      style={{ objectFit: "cover", height: "300px" }}
                    />
                  </Link>
  
                  <div className="card-body">
                    <h5 className="card-title">{produit.nom}</h5>
                    <p className="card-text text-primary">{produit.prix} €</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => ajouter(produit)}
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  
  export default Categorie;  