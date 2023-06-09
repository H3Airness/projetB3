import { useContext } from "react";
import { dataContext } from "../context/dataContext";
import { useNavigate } from "react-router-dom";

const Panier = () => {
  const { ajouter, panier, retirer, supprimer, nombreProduits, getTotalProduit, getTotalPanier } = useContext(dataContext);
  console.log("Contenu du panier:", panier);
  const navigate = useNavigate();

  const handlePayer = () => {
    if(panier.length === 0)
    {
      alert("Votre panier est vide !");
    }
    else
    {
      navigate('/Livraison');
    }
  }

  return (
    <>
      <h1 className="mb-4 text-center">Récapitulatif de mon Panier</h1>
      <div className="rounded Min-heightConteinerPanier">
        <div className="shadow p-1 mb-4 bg-body rounded divArticles">
          <h3 className="text-center mb-5">
            Vos articles
          </h3>
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
                        alt={produit.nom}
                      />
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={produit.quantite === 1}
                        onClick={() => retirer(produit)}
                      >
                        -
                      </button>
                      <span className="mx-2">{produit.quantite}</span>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => ajouter(produit)}
                      >
                        +
                      </button>
                    </td>

                    <td> 
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(getTotalProduit(produit))}
                    </td>

                    <td>
                      <button
                        onClick={() => supprimer(produit)}
                        className="btn border-danger text-danger"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="shadow p-3 bg-body rounded divPrixArticles">
          <h3 className="text-center">Total à payer</h3>
          <br />
          <p>
            Tarif {nombreProduits > 1 && `pour (${nombreProduits} articles)`}:&nbsp;
            {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(getTotalPanier())}
          </p>


          <p>Livraison: 10€</p>
          <div className="TotalPayer">
            <h6>Total: {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(getTotalPanier() + 10)}</h6>
                <button className="btn btn-primary" onClick={handlePayer}>Payer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panier;