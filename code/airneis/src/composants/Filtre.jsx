import React from "react";

const Filtre = ({ prixCroissant, prixDecroissant, onFilterChange }) => {
  const handlePrixCroissantChange = () => {
    onFilterChange({ prixCroissant: !prixCroissant, prixDecroissant: false });
  };

  const handlePrixDecroissantChange = () => {
    onFilterChange({ prixDecroissant: !prixDecroissant, prixCroissant: false });
  };

  return (
    <div className="col">
      <div className="form-group">
        <h4>Filtrer par prix</h4>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="prix-croissant"
            checked={prixCroissant}
            onChange={handlePrixCroissantChange}
          />
          <label className="form-check-label" htmlFor="prix-croissant">
            Prix croissant
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="prix-decroissant"
            checked={prixDecroissant}
            onChange={handlePrixDecroissantChange}
          />
          <label className="form-check-label" htmlFor="prix-decroissant">
            Prix décroissant
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filtre;
