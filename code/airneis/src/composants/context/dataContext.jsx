import { useState } from "react";
import React from "react";

export const dataContext = React.createContext();

export function DataContextProvider({ children }) {
  const [panier, setPanier] = useState([]);
  const [nombreProduits, setNombreProduits] = useState(0); // variable de state pour stocker le nombre de produits dans le panier

  function ajouter(produit) {
    setPanier([...panier, produit]);
    setNombreProduits(nombreProduits + 1); // mise à jour du nombre de produits dans le panier
  }

  function supprimer(produit) {
    setPanier(panier.filter((i) => i !== produit));
    setNombreProduits(nombreProduits - 1); // mise à jour du nombre de produits dans le panier
  }

  return (
    <dataContext.Provider
      value={{ panier, nombreProduits, ajouter, supprimer }}
    >
      {children}
    </dataContext.Provider>
  );
}

export default DataContextProvider;
