import { NavLink } from "react-router-dom"

function Menu() {
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark">
                <ul className="navbar-nav NavItems">
                    <li className="nav-item">
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}><span className="navbar-brand fs-3 NavTitre">Àirneis</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/panier" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Panier</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/recherche" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Recherche</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/connexion" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Connexion</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default Menu;