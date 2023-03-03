import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function MenuNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fermerMenu = () => {
      setMenuOpen(false);
    };

    window.addEventListener("beforeunload", fermerMenu);

    return () => {
      window.removeEventListener("beforeunload", fermerMenu);
    };
  }, []);

  return (
    <div className="menu-navigation">
      <div className="icone-menu" onClick={toggleMenu}>
        <a className="nav-link"><img className="icone-recherche" src="../list_FILL0_wght400_GRAD0_opsz48.png" alt="Menu" /></a>
      </div>
      <nav className={`menu ${menuOpen ? "ouvert" : ""}`}>
        <ul>
          <li><NavLink to={"/connexion"}><a>Se connecter</a></NavLink></li>
          <li><NavLink to={"/"}><a>S'inscrire</a></NavLink></li>
          <li><NavLink to={"/cgu"}><a>CGU</a></NavLink></li>
          <li><NavLink to={"/mention-legale"}><a>Mentions légales</a></NavLink></li>
          <li><NavLink to={"/contact"}><a>Contact</a></NavLink></li>
          <li><NavLink to={"/"}><a>À Propos d'Àirneis</a></NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuNavigation;