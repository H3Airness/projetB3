import { useState } from "react";
import React from "react";

export const dataContext = React.createContext();

export function DataContextProvider({ children }) {
  const [panier, setPanier] = useState({});
  const [nombreProduits, setNombreProduits] = useState(0);

  function ajouter(produit) {
    const nouveauPanier = { ...panier }; // on fait une copie de l'objet panier pour ne pas modifier l'original directement
    if (nouveauPanier[produit.id]) { // si le produit est déjà dans le panier, on augmente sa quantité
      nouveauPanier[produit.id].quantite += 1;
    } else { // sinon, on ajoute une nouvelle entrée pour le produit dans le panier
      nouveauPanier[produit.id] = { ...produit, quantite: 1 };
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits + 1);
  }

  function supprimer(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.id].quantite > 1) { // si le produit a une quantité supérieure à 1, on la diminue
      nouveauPanier[produit.id].quantite -= 1;
    } else { // sinon, on le retire complètement du panier
      delete nouveauPanier[produit.id];
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - 1);
  }

  return (
    <dataContext.Provider
      value={{ panier: Object.values(panier), nombreProduits, ajouter, supprimer }} // on transforme l'objet panier en tableau pour faciliter l'affichage dans le composant Panier
    >
      {children}
    </dataContext.Provider>
  );
}

export default DataContextProvider;
