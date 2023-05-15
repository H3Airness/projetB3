import Menu from "../Menu";
import { useContext } from "react";
import { dataContext } from "../context/dataContext";
import { NavLink } from "react-router-dom";

const Panier = () => {
  const { ajouter, panier, retirer, supprimer, getTotalProduit, getTotalPanier } = useContext(dataContext);

  // Calcul du total des prix des produits dans le panier
  const totalProduits = panier.reduce((acc, curr) => acc + parseFloat(curr.prix), 0);

  return (
    <>
      <Menu />
      <h1 className="mb-4 text-center">Récapitulatif de mon Panier</h1>
      <div className="rounded Min-heightConteinerPanier">
        <div className="shadow p-2 mb-4 bg-body rounded divArticles">
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
                        src={produit.source}
                        alt={produit.nom}
                      />
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-secondary"
                        disabled={produit.quantite === 1}
                        onClick={() => retirer(produit)}
                      >
                        -
                      </button>
                      <span className="mx-2">{produit.quantite}</span>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => ajouter(produit)}
                      >
                        +
                      </button>
                    </td>

                    <td>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(produit.prix)}
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

        <div className="shadow p-3 mb-5 bg-body rounded divPrixArticles">
          <h3 className="text-center">Total à payer</h3>
          <br />
          <p>Produits: {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(totalProduits)}</p>
          <p>Livraison: 5€</p>
          <div className="TotalPayer">
            <h6>Total: {new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(totalProduits + 5)}</h6>
            <NavLink to="/Livraison">
                <button className="btn btn-primary">Payer</button>
            </NavLink>
        </div>
        </div>
      </div>
    </>
  );
};

export default Panier;
