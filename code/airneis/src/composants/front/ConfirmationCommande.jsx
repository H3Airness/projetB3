import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";

function ConfirmationCommande() {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const { adresseLivraison, adresseFacturation, Paiement } = useContext(InfoCommandeContext);

  console.log("adresseLivraison:", InfoCommandeContext);
  console.log("adresseFacturation:", adresseFacturation);
  console.log("Paiement:", Paiement);

  return (
    <>
      <center>
        <span>Page Confirmation Commande</span>
        

        <p>
          nomAdresseLivraison: {adresseLivraison.nomAdresseLivraison}<br />
          nomLivraison: {adresseLivraison.nomLivraison}<br />
          prenomLivraison: {adresseLivraison.prenomLivraison}<br />
          adresseLivraison: {adresseLivraison.adresseLivraison}<br />
          adresseLivraison2: {adresseLivraison.adresseLivraison2}<br />
          codePostalLivraison: {adresseLivraison.codePostalLivraison}<br />
          villeLivraison: {adresseLivraison.villeLivraison}<br />
          paysLivraison: {adresseLivraison.paysLivraison}<br />

          nomFacturation: {adresseFacturation.nomFacturation}<br />
          prenomFacturation: {adresseFacturation.prenomFacturation}<br />
          adresseFacturation: {adresseFacturation.adresseFacturation}<br />
          codePostalFacturation: {adresseFacturation.codePostalFacturation}<br />
          villeFacturation: {adresseFacturation.villeFacturation}<br />
          paysFacturation: {adresseFacturation.paysFacturation}<br />

          nomPaiement: {Paiement.nom}<br />
          numeroPaiement: {Paiement.numero}<br />
          datePaiement: {Paiement.date}<br />
          cvvPaiement: {Paiement.cvv}<br />

          totalPanier: {getTotalPanier()}<br />
          
          idCommande: {Paiement.idCommande}
        </p>
      </center>
    </>
  );
};

export default ConfirmationCommande;
