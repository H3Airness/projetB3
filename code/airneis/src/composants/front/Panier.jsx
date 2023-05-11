import Menu from "../Menu";
import { useContext } from "react";
import { dataContext } from "../context/dataContext";
import { NavLink } from "react-router-dom";

const Panier = () => {
  const { panier, supprimer } = useContext(dataContext);

  // Calcul du total des prix des produits dans le panier
  const totalProduits = panier.reduce((acc, curr) => acc + parseFloat(curr.prix), 0);

  // Création d'un objet pour stocker le nombre de produits identiques
  const quantites = {};
  for (let product of panier) {
    if (product.id in quantites) {
      quantites[product.id]++;
    } else {
      quantites[product.id] = 1;
    }
  }

  // Création d'un tableau d'objets contenant les produits uniques
  const produitsUniques = [];
  for (let product of panier) {
    let found = false;
    for (let i = 0; i < produitsUniques.length; i++) {
      if (produitsUniques[i].id === product.id) {
        found = true;
        produitsUniques[i].quantite++;
        break;
      }
    }
    if (!found) {
      produitsUniques.push({ ...product, quantite: 1 });
    }
  }

  return (
    <>
      <Menu />
      <h1 className="mb-4 text-center">Récapitulatif de mon Panier</h1>
      <div className="rounded Min-heightConteinerPanier">
        <div className="shadow p-2 mb-4 bg-body rounded divArticles">
          <h3 className="text-center mb-5">Vos articles</h3>
          <table className="table">
            <tbody className="vertical-align">
              {produitsUniques.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      <img
                        className="rounded d-block"
                        width={150}
                        src={product.source}
                        alt={product.nom}
                      />
                    </td>
                    <td>
  {product.nom}
  {product.quantite > 1 ? (
    <span className="badge bg-danger ms-2">
      {product.quantite}
    </span>
  ) : null}
  <br />
  Quantité : {product.quantite}
</td>

                    <td>
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(product.prix)}
                    </td>
                    <td>
                      <button
                        onClick={() => supprimer(product)}
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
