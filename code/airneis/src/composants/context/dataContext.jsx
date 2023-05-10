import { useState } from "react"
import React from "react";

export const dataContext = React.createContext();

export function DataContextProvider({children}) {
  const [panier, setPanier] = useState([]);

  function ajouter(produit) {
    setPanier([...panier, produit]);
  }

  function supprimer(produit) {
    setPanier(panier.filter(i => i !== produit));
  }

  return (
    <dataContext.Provider value={{panier, ajouter, supprimer}}>
      {children}
    </dataContext.Provider>
  );
}

export default DataContextProvider ;
