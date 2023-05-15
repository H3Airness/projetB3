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
      nouveauPanier[produit.id] = { ...produit, quantite: 0 };
      nouveauPanier[produit.id].quantite += 1;
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits + 1);
  }
  

  function retirer(produit) {
    const nouveauPanier = { ...panier };
    if (nouveauPanier[produit.id].quantite > 1) { // si le produit a une quantité supérieure à 1, on la diminue
      nouveauPanier[produit.id].quantite -= 1;
    } else { // sinon, on le retire complètement du panier
      delete nouveauPanier[produit.id];
    }
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - 1);
  }

  function supprimer(produit) {
    const nouveauPanier = { ...panier };
    delete nouveauPanier[produit.id]; // on supprime complètement le produit du panier
    setPanier(nouveauPanier);
    setNombreProduits(nombreProduits - produit.quantite); // on soustrait la quantité du produit supprimé du nombre total de produits dans le panier
  }

  function getTotalProduit(produit) {
    const prix = parseFloat[produit.prix];
    return prix * produit.quantite;
  }
  
  

  function getTotalPanier() {
    let total = 10;
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
