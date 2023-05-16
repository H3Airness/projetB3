import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext"

function Categorie() {
    const { categorie } = useParams();
    const [products, setProducts] = useState([]);
    const { ajouter } = useContext(dataContext);
  
    useEffect(() => {
      fetch(`http://airneis.ddns.net:3000/categorie.php?categorie=${categorie}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setProducts(data);
        })
        .catch(error => console.error(error));
    }, [categorie]);
  
    if (products.length === 0) {
      return <p>Chargement...</p>;
    }
  
    return (
      <>
        <div className="container mt-4">
          <div className="row justify-content-center">
            {products.map((product) => (
              <div className="col-md-4 mb-3" key={product.id}>
                <div className="card">
                  <Link to={`/Produit/${product.id}`}>
                    <img
                      className="card-img-top"
                      src={product.source}
                      alt={product.titre}
                      style={{ objectFit: "cover", height: "300px" }}
                    />
                  </Link>
  
                  <div className="card-body">
                    <h5 className="card-title">{product.nom}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">{product.prix}€</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => ajouter(product)}
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