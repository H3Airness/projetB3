import React, { createContext, useState } from "react";

export const InfoCommandeContext = createContext();

export const InfoCommandeProvider = ({ children }) => {
  const [adresseLivraison, setLivraison] = useState(null);
  const [adresseFacturation, setFacturation] = useState(null);

  const adresseLivraisonSelectionner = (adresse) => {
    setLivraison(adresse);
  };

  const adresseLivraisonFacturation = (adresse) => {
    setFacturation(adresse);
  };

  return (
    <InfoCommandeContext.Provider
      value={{ adresseLivraison, adresseFacturation, adresseLivraisonSelectionner, adresseLivraisonFacturation }}
    >
      {children}
    </InfoCommandeContext.Provider>
  );
}

export default InfoCommandeProvider;
