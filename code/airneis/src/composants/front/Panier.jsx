import Menu from "../Menu";
import { useContext } from "react";
import { dataContext } from "../context/dataContext"

const Panier = () => {

    const { panier, supprimer } = useContext(dataContext);
    
    return ( <>
    <Menu/>
    <h1 className="mb-4 text-center">Récapitulatif de mon Panier</h1>
    <div className="rounded Min-heightConteinerPanier">    
        <div className="shadow p-3 mb-5 bg-body rounded divArticles">
            <h3 className="text-center mb-5">Vos articles</h3>
            {panier.map((product) => {
                return (
                <tr key={product.id}>
                    <div className="ImgArticlesPanier">
                        <img className="rounded mb-4 d-block" width={150} src={product.source}/>
                    </div>
                    <td>{product.nom}</td>
                    <td>{new Intl.NumberFormat("fr-FR", { style: 'currency', currency: 'EUR' }).format(product.prix)}</td>
                    <td>
                        <button onClick={() => supprimer(product)} className="btn border-danger text-danger" >supprimer</button>
                    </td>
                </tr>
            )}) }
        </div>
        <div className="shadow p-3 mb-5 bg-body rounded divPrixArticles">
            <h3 className="text-center">Total à payer</h3>
            <br/>
            <p>Produits: 100euros</p>
            <p>Livraison: 5euros</p>
            <div className="TotalPayer">
                <h6>Total: 105euros</h6>
                <button className="btn btn-primary">Payer</button>
            </div>
        </div>
    </div>    
    </> );
}
 
export default Panier;