import { useState, useContext, useEffect } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Connexion from "./Connexion";

const Livraison = () => {
  const [loading, setLoading] = useState(true);
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const [adresse, setAdresse] = useState("");
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountLivraison, setAccountLivraison] = useState([]);
  const [selectedAdresse, setSelectedAdresse] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  };

  const handlePayer = () => {
    navigate("/Paiement");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountLivraison(accountRes.data.accountLivraison);
          setLoading(false);
        } else {
          console.error('Erreur lors de la récupération des données du compte: ', accountRes.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du compte: ', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  useEffect(() => {
    if (panier.length === 0) {
      navigate("/panier");
    }
  }, []);

  const handleEditLivraison = () => {
    // TODO: Implémenter la logique de modification de l'adresse de livraison
  };

  const handleAdresseSelect = (e) => {
    const selectedId = e.target.value;
    const selectedAddress = accountLivraison.find((adresse) => adresse.id === selectedId);
    setSelectedAdresse(selectedAddress);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <h1 className="mb-4 text-center">Livraison</h1>
          <div className="rounded flex-column Min-heightConteinerPanier">
            <div className="d-flex align-items-center justify-content-center">
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
                <div className="fw-bold TotalPayer ml-2">
                  <h6>
                    Total :{" "}
                    {new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(getTotalPanier() + 10)}
                  </h6>
                </div>
              </div>
            </div>
            {accountLivraison.length > 0 ? (
              <div>
                <label htmlFor="adresse-select">Sélectionnez une adresse :</label>
                <select id="adresse-select" value={selectedAdresse ? selectedAdresse.id : ""} onChange={handleAdresseSelect}>
                  <option value="">Choisir une adresse</option>
                  {accountLivraison.map((adresse) => (
                    <option key={adresse.id} value={adresse.id}>{adresse.nom_adresse}</option>
                  ))}
                </select>
                {selectedAdresse ? (
                  <div>
                    <p>Nom: {selectedAdresse.nom}</p>
                    <p>Prénom: {selectedAdresse.prenom}</p>
                    <p>Adresse: {selectedAdresse.adresse1}</p>
                    <p>Code postal: {selectedAdresse.code_postal}</p>
                    <p>Ville: {selectedAdresse.ville}</p>
                    <p>Pays: {selectedAdresse.pays}</p>
                    <div className='text-center'>
                      <button className='btn btn-primary' onClick={handleEditLivraison}>Modifier mon adresse de livraison</button>
                    </div>
                  </div>
                ) : (
                  <p>Veuillez sélectionner une adresse.</p>
                )}
              </div>
            ) : (
              <div>
                <p>Aucune adresse de livraison n'est disponible pour ce compte.</p>
                <div className='text-center'>
                  <button className='btn btn-primary' onClick={handleEditLivraison}>Ajouter une adresse de livraison</button>
                </div>
              </div>
            )}
            <button className="btn btn-primary my-3" onClick={handlePayer}>
              Payer
            </button>
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

export default Livraison;
