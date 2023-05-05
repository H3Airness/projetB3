import React, { useState } from "react";
import Menu from "../Menu";

const Recherche = () => {
  const [recherche, setRecherche] = useState("");

  function handleChange(event) {
    setRecherche(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Ici, vous pouvez appeler votre API de recherche pour obtenir les résultats pertinents
    console.log(`Recherche soumise : ${recherche}`);
  }

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
    </>
  );
};

export default Recherche;
