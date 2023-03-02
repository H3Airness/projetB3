import { NavLink } from "react-router-dom"

function Footer() {
    return ( 
        <div className="nav-bg-footer">
            <footer className="navbar navbar-expand navbar-dark Footer ">
                <ul className="navbar-nav">
                    <li className="nav-item footer">
                        <NavLink to="/CGU" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Condition Général d'Utilisation</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/mention-legale" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Mention Légales</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/contact" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Contact</NavLink>
                    </li>
                </ul>

                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                        <NavLink to="" className={({isActive}) => {
                            return isActive ? "nav-link active text-light" : "nav-link"
                        }}>Réseaux</NavLink>
                    </li>
                </ul>
            </footer>
        </div>
     );
}

export default Footer;