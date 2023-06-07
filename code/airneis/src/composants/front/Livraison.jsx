import { useState, useContext } from "react";
import { dataContext } from "../context/dataContext";

const Livraison = () => {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const [adresse, setAdresse] = useState("");
  const [numeroCarte, setNumeroCarte] = useState("");

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleNumeroCarteChange = (e) => {
    setNumeroCarte(e.target.value);
  };

  const handlePayer = () => {
    // Logique de traitement du paiement avec l'adresse et le numéro de carte
    // ...
  };

  return (
    <>
      <h1 className="mb-4 text-center">Paiement</h1>
      <div className="rounded flex-column Min-heightConteinerPanier">
        <div className="shadow p-1 mb-4 bg-body rounded divArticles">
          <h3 className="text-center mb-5">Vos articles sélectionnés</h3>
          <table className="table">
            <tbody className="vertical-align">
              {panier.map((produit) => {
                return (
                  <tr key={produit.id}>
                    <td>
                      <img
                        className="rounded d-block"
                        width={150}
                        src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                        alt={'Auccun article selectionné !'}
                      />
                    </td>

                    <td>
                      <span className="mx-2">{produit.quantite}</span>
                    </td>

                    <td>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(getTotalProduit(produit))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        <br />
        </div>
        <p>Livraison : 10€</p>
          <div className="TotalPayer">
            <h6>
              Total :{" "}
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(getTotalPanier() + 10)}
            </h6>
            <div>
              <input
                type="text"
                placeholder="Adresse de livraison"
                value={adresse}
                onChange={handleAdresseChange}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Numéro de carte bancaire"
                value={numeroCarte}
                onChange={handleNumeroCarteChange}
              />
            </div>
            <button className="btn btn-primary" onClick={handlePayer}>
              Payer
            </button>
          </div>
        <p className="fw-bold">
          Montant à payer :&nbsp;
          {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
          }).format(getTotalPanier())}
        </p>
      </div>
    </>
  );
};

export default Livraison;
