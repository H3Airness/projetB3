import { useState, useContext, useEffect } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/infoCommandeContext";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";

const Paiement = () => {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const [numeroCarte, setNumeroCarte] = useState("");
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const data = { userId: accountId };
  const { adresseLivraison, adresseFacturation } = useContext(InfoCommandeContext);

  useEffect(() => {
    console.log("Adresse de livraison :", adresseLivraison);
    console.log("Adresse de facturation :", adresseFacturation);
  }, [adresseLivraison, adresseFacturation]);
  
  
  const handleNumeroCarteChange = (e) => {
    setNumeroCarte(e.target.value);
  };

  const handlePayer = () => {
    navigate("/ConfirmationCommande");
  };

  useEffect(() => {
    axios
      .post("http://airneis.ddns.net:3000/catch_info.php", data)
      .then((response) => {
        console.log(response.data);
        setAdresse(response.data.adresse);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (panier.length === 0) {
      navigate("/panier");
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
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
                          <img
                            className="rounded d-block"
                            width={100}
                            src={`http://airneis.ddns.net:3000/img_produit/${produit.id}`}
                            alt={produit.nom}
                          />
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
              <br />
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
            <br />
            <button className="btn btn-primary" onClick={handlePayer}>
              Payer
            </button>
            <NavLink to='/Livraison' className='btn btn-light my-3'>
              Retour
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <Connexion previousLocation={location.pathname} />
        </>
      )}
    </>
  );
};

export default Paiement;
