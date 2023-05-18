import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { dataContext } from "../context/dataContext"

function Categorie() {
    const { categorie } = useParams();
    const [produits, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { ajouter } = useContext(dataContext);

    useEffect(() => {
      axios.get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${categorie}`)
        .then(response => setCategories(response.data))
        .catch(error => console.log(error));
    }, []);
  
    useEffect(() => {
      fetch(`http://airneis.ddns.net:3000/categorie/categorie.php?categorie=${categorie}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setProducts(data);
        })
        .catch(error => console.error(error));
    }, [categorie]);
  
    if (produits.length === 0) {
      return <p>Chargement...</p>;
    }
  
    return (
      <>
        {categories.map((categorie) => (
          <div key={categorie.nom}>
            <img src={`http://airneis.ddns.net:3000/img/${categorie.nom}/banniere.jpg`} alt={categorie.nom} style={{ width: '100%' }} />
            <div className="ContactTitre">
              <span>{categorie.nom}</span>
            </div>
          </div>
        ))}

        <div className="container mt-4">
          <div className="row justify-content-center">
            {produits.map((produit) => (
              <div className="col-md-4 mb-3" key={produit.id}>
                <div className="card">
                  <Link to={`/Produit/${produit.id}`}>
                    <img
                      className="card-img-top"
                      src={`http://airneis.ddns.net:3000/img/${produit.source}`}
                      alt={produit.titre}
                      style={{ objectFit: "cover", height: "300px" }}
                    />
                  </Link>
  
                  <div className="card-body">
                    <h5 className="card-title">{produit.nom}</h5>
                    <p className="card-text">{produit.description}</p>
                    <p className="card-text">{produit.prix}€</p>
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