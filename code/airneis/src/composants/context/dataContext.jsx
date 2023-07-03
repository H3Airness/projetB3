import { useState } from "react";
import React from "react";

export const dataContext = React.createContext();

export function DataContextProvider({ children }) {
  const [panier, setPanier] = useState({});
  const [nombreProduits, setNombreProduits] = useState(0);

  function ajouter(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.id]) {
      if (nouveauPanier[produit.id].quantite < produit.stock) {
        nouveauPanier[produit.id].quantite += 1;
        setPanier(nouveauPanier);
        setNombreProduits(nombreProduits + 1);
      }
    } else {
      nouveauPanier[produit.id] = { ...produit, quantite: 1 };
      setPanier(nouveauPanier);
      setNombreProduits(nombreProduits + 1);
    }
  }
  

  function retirer(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.id].quantite > 1) {
      nouveauPanier[produit.id].quantite -= 1;
    } else {
      delete nouveauPanier[produit.id];
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - 1);
  }

  function supprimer(produit) {
    const nouveauPanier = { ...panier };
    delete nouveauPanier[produit.id];
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - produit.quantite);
  }

  function getTotalProduit(produit) {
    const prix = parseFloat(produit.prix) || 0;
    return prix * produit.quantite;
  }
  

  function getTotalPanier() {
    let total = 0;
    Object.values(panier).forEach(produit => {
      total += getTotalProduit(produit);
    });
    return total;
  }

  return (
    <dataContext.Provider
      value={{ panier: Object.values(panier), nombreProduits, ajouter, retirer, supprimer, getTotalProduit, getTotalPanier }}
    >
      {children}
    </dataContext.Provider>
  );
}

export default DataContextProvider;
