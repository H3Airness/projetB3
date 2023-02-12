import { NavLink } from "react-router-dom"

function Menu() {
    return ( 
        <div className="bg-dark mb-3">
            <nav className="navbar navbar-expand navbar-dark container">
                <span className="navbar-brand fs-3">
                    Àirneis
                </span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Accueil</NavLink>
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