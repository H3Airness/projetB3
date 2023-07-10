import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { dataContext } from "../context/dataContext"
import { Link } from "react-router-dom"

const Recherche = () => {
  const [recherche, setRecherche] = useState("");
  const [donnees, setDonnees] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [aucunResultat, setAucunResultat] = useState(false);
  const {ajouter} = useContext(dataContext);

  function handleChange(event) {
    setRecherche(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    

    const filtre = recherche.trim().toLowerCase(); 
    const resultatsFiltres = donnees.filter(donnee =>
        donnee.nom.toLowerCase().includes(filtre) ||
        donnee.description.toLowerCase().includes(filtre)
      );
      
    setResultats(resultatsFiltres);
    setAucunResultat(resultatsFiltres.length === 0);
  }

  useEffect(() => {
    axios
      .get("http://airneis.ddns.net:3000/recherche.php")
      .then((response) => {
        setDonnees(response.data);
        setResultats(response.data);
      })
      .catch((error) => {
      });
  }, []);

  return (
    <>
      <div className="text-center">
        <h1></h1>
      </div>
      <br />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher des produits"
                  value={recherche}
                  onChange={handleChange}
                />
                <div className="input-group-append justify-content-end align-items-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                  ><img style={{width:"24px"}} src="http://airneis.ddns.net:3000/img/icon_recherche.png"></img>
                    Rechercher
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {aucunResultat && (
        <div className="alert alert-danger text-center mt-5" role="alert">
          Aucun résultat trouvé pour votre recherche.
        </div>
      )}
      <div className="container mt-4">
        <div className="row justify-content-center">
          {resultats.map((resultat) => (
            <div className="col-md-4 mb-3" key={resultat.id}>
              <div className="card">
              <Link to={`/Produit/${resultat.id}`}>
                <img
                  className="card-img-top"
                  src={`http://airneis.ddns.net:3000/img_produit/${resultat.id}`}
                  alt={resultat.nom}
                  style={{ objectFit: "cover", height: "300px" }}
                />
                </Link>

                <div className="card-body">
                  <h5 className="card-title">{resultat.nom}</h5>
                  <p className="price-text">{resultat.prix} €</p>
                  <center>
                    {resultat.stock > 0 ? (
                      <button className="add-to-cart-btn" onClick={() => ajouter(resultat) }>
                        <span>Ajouter au panier 🛒</span>
                      </button>
                    ) : (
                      <button className="out-of-stock-btn" disabled>
                        <span>Stock épuisé</span>
                      </button>
                    )}
                  </center>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Recherche;
