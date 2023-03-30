import Menu from "../Menu";

const Panier = () => {
    return ( <>
    <Menu/>
    <h1 className="text-center mb-4">Récapitulatif de mon Panier</h1>
    <div className="Min-heightConteinerPanier">    
        <div className="shadow p-3 mb-5 bg-body rounded divArticles">
            <h3 className="text-center">Vos articles</h3>
        </div>
        <div className="shadow p-3 mb-5 bg-body rounded divPrixArticles">
            <h3 className="text-center">Total à payer</h3>
        </div>
    </div>    
    </> );
}
 
export default Panier;