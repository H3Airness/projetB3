import React from 'react';
import { NavLink } from 'react-router-dom';
import Menu from "../Menu";



const Accueil = () => {

    return ( <>
    
    <div>
        <Menu/>
    </div>
    <div className="info-airneis mt-5">
        <div className='DivAcceuil'> 
            <NavLink to={"http://airneis.fr"} target="_blank" className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="logo.svg" alt="" /><span className="texteacceuil">airneis.fr</span></NavLink>
        </div>
        <div className='DivAcceuil'> 
            <NavLink to={"http://airneis.ddns.net:3000"} target="_blank" className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="https://www.onda-dias.eu/cms/wp-content/uploads/2018/05/api.png" alt="" /><span className="texteacceuil">API</span></NavLink>
        </div>
        <div className='DivAcceuil'> 
            <NavLink to={"http://airneis.ddns.net:3000/phpmyadmin/"} target="_blank" className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="https://upload.wikimedia.org/wikipedia/commons/9/95/PhpMyAdmin_logo.png" alt="" /><span className="texteacceuil">BDD (phpmyadmin)</span></NavLink>
        </div>
        <div className='DivAcceuil'> 
            <NavLink to={"/articles"} className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="http://airneis.ddns.net:3001/meubles.jpg" alt="" /><span className="texteacceuil">Articles</span> </NavLink>
        </div>
    </div>
    </> );
}

export default Accueil ;

