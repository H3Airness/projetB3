import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menu from "../Menu";
import { dataContext } from "../context/dataContext"

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
    
    console.log(`Recherche : ${recherche}`);
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
        console.log(error);
      });
  }, []);

  return (
    <>
      <Menu />
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
                  >
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
                <img
                  className="card-img-top"
                  src={resultat.source}
                  alt={resultat.nom}
                  style={{ objectFit: "cover", height: "300px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{resultat.nom}</h5>
                  <p className="card-text text-primary">{resultat.prix} €</p>
                  <button className="btn btn-primary" onClick={() => ajouter(resultat) }>Ajouter au panier</button>
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
