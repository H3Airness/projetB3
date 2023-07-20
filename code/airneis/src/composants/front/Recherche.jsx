import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { dataContext } from "../context/dataContext";
import { Link } from "react-router-dom";
import Filtre from "../Filtre";

const Recherche = () => {
  const [donnees, setDonnees] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [aucunResultat, setAucunResultat] = useState(false);
  const [afficherFiltre, setAfficherFiltre] = useState(false);
  const [filtreRecherche, setFiltreRecherche] = useState("");
  const { ajouter } = useContext(dataContext);

  function handleSubmit(event) {
    event.preventDefault();

    const filtreRechercheTrimmed = filtreRecherche.trim().toLowerCase();
    const resultatsFiltres = donnees.filter((donnee) => {
      const nomProduit = donnee.nom.toLowerCase();
      // Correspondance exacte
      if (nomProduit === filtreRechercheTrimmed) {
        return true;
      }
      if (
        nomProduit.length === filtreRechercheTrimmed.length &&
        differeDUnCaractere(nomProduit, filtreRechercheTrimmed)
      ) {
        return true;
      }
      if (nomProduit.startsWith(filtreRechercheTrimmed)) {
        return true;
      }
      if (nomProduit.includes(filtreRechercheTrimmed)) {
        return true;
      }
      return false;
    });

    setResultats(resultatsFiltres);
    setAucunResultat(resultatsFiltres.length === 0);
  }

  function handleFilterClick() {
    setFiltreRecherche("");
    setAfficherFiltre(!afficherFiltre);
  }

  useEffect(() => {
    const filtreRechercheTrimmed = filtreRecherche.trim().toLowerCase();
    axios
      .get("http://airneis.ddns.net:3000/recherche.php", {
        params: {
          recherche: filtreRechercheTrimmed,
        },
      })
      .then((response) => {
        const resultatsFiltres = response.data.filter((donnee) => {
          const nomProduit = donnee.nom.toLowerCase();
          // Correspondance exacte
          if (nomProduit === filtreRechercheTrimmed) {
            return true;
          }
          if (
            nomProduit.length === filtreRechercheTrimmed.length &&
            differeDUnCaractere(nomProduit, filtreRechercheTrimmed)
          ) {
            return true;
          }
          if (nomProduit.startsWith(filtreRechercheTrimmed)) {
            return true;
          }
          if (nomProduit.includes(filtreRechercheTrimmed)) {
            return true;
          }
          return false;
        });

        setResultats(resultatsFiltres);
        setAucunResultat(resultatsFiltres.length === 0);
      })
      .catch((error) => {});
  }, [filtreRecherche]);

  function differeDUnCaractere(chaine1, chaine2) {
    let diffCount = 0;
    for (let i = 0; i < chaine1.length; i++) {
      if (chaine1[i] !== chaine2[i]) {
        diffCount++;
        if (diffCount > 1) {
          return false;
        }
      }
    }
    return diffCount === 1;
  }

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
                  value={filtreRecherche}
                  onChange={(event) => setFiltreRecherche(event.target.value)}
                />
                <div className="input-group-append justify-content-end align-items-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                  >
                    <img
                      style={{ width: "24px" }}
                      src="http://airneis.ddns.net:3000/img/icon_recherche.png"
                      alt="Rechercher"
                    />
                    Rechercher
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                    onClick={handleFilterClick}
                  >
                    Filtres
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
      {afficherFiltre && (
        <Filtre
          setDonnees={setResultats}
          setResultats={setResultats}
          fermerFiltre={() => setAfficherFiltre(false)}
        />
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
                      <button className="add-to-cart-btn" onClick={() => ajouter(resultat)}>
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
