import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { NavLink } from "react-router-dom"

function Footer() {
    return ( 
        <div className="nav-bg-footer">
            <footer className="navbar navbar-expand navbar-dark Footer ">
                <ul className="navbar-nav ">
                    <li className="nav-item footer ">
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
                        <a href="https://www.google.fr" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <FontAwesomeIcon icon={faInstagram} className="text-light" size="2x" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.google.fr" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <FontAwesomeIcon icon={faFacebook} className="text-light" size="2x" />
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="https://www.google.fr" target="_blank" rel="noopener noreferrer" className="nav-link">
                            <FontAwesomeIcon icon={faLinkedin} className="text-light" size="2x"/>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>
     );
}

export default Footer;