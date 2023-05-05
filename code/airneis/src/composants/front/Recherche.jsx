import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "../Menu";

const Recherche = () => {
  const [recherche, setRecherche] = useState("");
  const [donnees, setDonnees] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [aucunResultat, setAucunResultat] = useState(false);

  function handleChange(event) {
    setRecherche(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    console.log(`Recherche : ${recherche}`);
    const filtre = recherche.trim().toLowerCase(); // Ignorer les espaces et passer en minuscules
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Menu />
      <div className="text-center">
        <h1>Page recherche</h1>
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
      {aucunResultat ? (
        <div className="h2 text-center mt-5 text-danger">
          Nous n'avons pas trouvé de résultats à votre recherche. Nous sommes désolés.
        </div>
      ) : (
        resultats.length > 0 && (
          <div>
            {resultats.map((resultat) => (
              <p key={resultat.id}>
                 {resultat.prix} <img width={400} src={resultat.source} />
              </p>
            ))}
          </div>
        )
      )}
    </>
  );
};

export default Recherche;
