import { NavLink } from "react-router-dom"
import MenuNavigation from "./front/MenuNavigation";


function Menu() {
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark nav-bg border-0">
                <ul className="navbar-nav NavItems">
                    <li className="nav-item">
                    
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}> <img className="logo-airneis" src="logo.svg" alt="" /><span className="NavTitre">Àirneis</span></NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav NavItems ms-auto">
                    <li className="nav-item">
                        <NavLink to="/Recherche" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}><img className="icone-recherche" src="./search_FILL0_wght400_GRAD0_opsz48.png"></img> </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Panier" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}><img className="icone-recherche" src="./shopping_cart_FILL0_wght400_GRAD0_opsz48.png"></img> </NavLink>
                    </li>

                    <li className="nav-item troisbarresMenu">
                       <MenuNavigation/>
                    </li>                    
                </ul>
            </nav>
        </div>
     );
}

export default Menu;