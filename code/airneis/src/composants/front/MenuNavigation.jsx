import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function MenuNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();
  const { login, logout } = useContext(AuthContext);

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

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    login();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    logout();
  };

  return (
    <div className="menu-navigation">
      <div className="icone-menu" onClick={toggleMenu}>
        <img
          className="icone-recherche"
          src="http://airneis.ddns.net:3000/img/icon_menu.png"
          alt="Menu"
        />
      </div>
      <nav className={`menu ${menuOpen ? "ouvert" : ""}`} ref={menuRef}>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <NavLink to={"/mon-compte"}>Mon compte</NavLink>
              </li>
              <li>
                <NavLink to={"/"} onClick={handleLogout}>
                  Déconnexion
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/connexion"}>Se connecter</NavLink>
              </li>
              <li>
                <NavLink to={"/inscription"}>S'inscrire</NavLink>
              </li>
            </>
          )}
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
            <NavLink to={"/propos"}>À Propos d'Àirneis</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MenuNavigation;
