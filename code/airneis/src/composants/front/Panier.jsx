import Menu from "../Menu";

const Panier = () => {
    return ( <>
    <Menu/>
    <h1 className="mb-4 text-center">Récapitulatif de mon Panier</h1>
    <div className="rounded Min-heightConteinerPanier">    
        <div className="shadow p-3 mb-5 bg-body rounded divArticles">
            <h3 className="text-center mb-5">Vos articles</h3>
            <img className="rounded mb-4 d-block" width={200} height={140} src={"https://picsum.photos/800/600?random=3"} />
            <img className="rounded mb-4 d-block" width={200} height={140} src={"https://picsum.photos/800/600?random=3"} />
            <img className="rounded mb-4 d-block" width={200} height={140} src={"https://picsum.photos/800/600?random=3"} />
        </div>
        <div className="shadow p-3 mb-5 bg-body rounded divPrixArticles">
            <h3 className="text-center">Total à payer</h3>
            <br/>
            <p>Produits: 100euros</p>
            <p>Livraison: 5euros</p>
            <h6>Total: 105euros</h6>
        </div>
    </div>    
    </> );
}
 
export default Panier;