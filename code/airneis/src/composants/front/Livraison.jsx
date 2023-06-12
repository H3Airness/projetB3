import { useState, useContext, useEffect } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Livraison = () => {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const [adresse, setAdresse] = useState("");
  const [numeroCarte, setNumeroCarte] = useState("");
  const { accountId } = useContext(AuthContext);
  const navigate = useNavigate();
  const data = { userId: accountId };

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handleNumeroCarteChange = (e) => {
    setNumeroCarte(e.target.value);
  };

  const handlePayer = () => {
    //Pour payer
  };


  useEffect(() => {
    axios.post('http://airneis.ddns.net:3000/catch_info.php', data)
      .then(response => {
        console.log(response.data); // Afficher la réponse dans les logs
        setAdresse(response.data.adresse);
      })
      .catch(error => console.log(error));
  }, []);
  
  

    useEffect(() => {
    if (panier.length === 0) {
      navigate("/panier");
    }
  }, []);

  return (
    <>
      <h1 className="mb-4 text-center">Paiement</h1>
      <div className="rounded flex-column Min-heightConteinerPanier">
        <div className="bg-body rounded mb-2 divLivraisonArticles">
          <h3 className="text-center mb-5">Vos articles sélectionnés</h3>
          <table className="table">
            <tbody className="vertical-align">
              {panier.map((produit) => {
                return (
                  <tr key={produit.id}>
                    <td>
                      <img className="rounded d-block" width={100} src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`} alt={produit.nom}/>
                    </td>

                    <td>
                      <p>{produit.nom}</p>
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
        <br/>
        <p>
          Montant des articles: &nbsp;
          {new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
          }).format(getTotalPanier())}
        </p>
        <p>Livraison : 10€</p>
          <div className="fw-bold TotalPayer">
            <h6>
              Total :{" "}
              {new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(getTotalPanier() + 10)}
            </h6>
          </div>
        </div>
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
                placeholder="Code postal"
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
            <div>
              <input
                type="text"
                placeholder="Cryptogramme visuel"
                value={numeroCarte}
                onChange={handleNumeroCarteChange}
              />
            </div>
            <button className="btn btn-primary my-3" onClick={handlePayer}>Payer</button>
      </div>
    </>
  );
};

export default Livraison;
