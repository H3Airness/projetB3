import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";

function ConfirmationCommande() {
  const { adresseLivraison, adresseFacturation, Paiement } = useContext(InfoCommandeContext);

  return (
    <>
        <center>
          <span>Page Confirmation Commande</span>
          <p>{adresseLivraison.nomAdresse}</p>
          <p>{adresseFacturation.adresse_facturation}</p>
          <p>{Paiement.nom}</p>
        </center>
    </>
  );
};
export default ConfirmationCommande;
