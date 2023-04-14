import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

function MenuNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu-navigation">
      <div className="icone-menu" onClick={toggleMenu}>
        <img
          className="icone-recherche"
          src="../list_FILL0_wght400_GRAD0_opsz48.png"
          alt="Menu"
        />
      </div>
      <nav className={`menu ${menuOpen ? "ouvert" : ""}`} ref={menuRef}>
        <ul>
          <li>
            <NavLink to={"/connexion"}>Se connecter</NavLink>
          </li>
          <li>
            <NavLink to={"/inscription"}>S'inscrire</NavLink>
          </li>
          <li>
            <NavLink to={"/cgu"}>CGU</NavLink>
          </li>
          <li>
            <NavLink to={"/mention-legale"}>Mentions légales</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/"}>À Propos d'Àirneis</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuNavigation;
