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
        <img className="icone-recherche" src="../list_FILL0_wght400_GRAD0_opsz48.png" alt="Menu" />
      </div>
      <nav className={`menu ${menuOpen ? "ouvert" : ""}`}>
        <ul>
          <li><NavLink to={"/connexion"}>Se connecter</NavLink></li>
          <li><NavLink to={"/contact"}>Contact</NavLink></li>
          <li><NavLink to={"http://airneis.fr"} target="_blank">airneis.fr</NavLink></li>
          <li><NavLink to={"http://airneis.fr:3000"} target="_blank">API</NavLink></li>
          <li><NavLink to={"http://86.247.29.14:3000/phpmyadmin/"} target="_blank">BDD</NavLink></li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuNavigation;