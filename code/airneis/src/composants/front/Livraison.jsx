import React from 'react';
import Menu from '../Menu';
import { NavLink } from 'react-router-dom';


function Livraison() {

  return (
    <>
        <Menu/>
        <center>
            <div className="ContactTitre">Vous allez trop vite</div>
            <span>Cette page est encore en développement</span>
            <br/>
            <img width={200} src="https://www.badenconsulting.com/wp-content/uploads/ISO_7010_W001.svg_.png" alt="" /> 
            <br/>
            <br/>
            <NavLink to="/Panier">
                <button className="btn btn-warning">Retourner au panier</button>
            </NavLink>
        </center>
    </>
  );
}

export default Livraison;