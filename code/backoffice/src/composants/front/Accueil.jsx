import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Connexion from "./Connexion";

const Accueil = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [response, setResponse] = useState("");
    const navigate = useNavigate();
  
    const authContext = useContext(AuthContext); // Utiliser le contexte AuthContext
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
  
      let formType = {};
      formData.forEach((value, key) => (formType[key] = formData.get(key)));
  
      async function postData() {
        try {
          const response = await axios.post(
            "http://airneis.ddns.net:3000/connexion.php",
            formType,
            {}
          );
          setResponse(response.data);
          if (response.data.status === "success") {
            navigate("/");
            authContext.login(); 
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      postData();
    };

    return ( <>
        {isLoggedIn ? (
            <>
                <div className="info-airneis mt-5">
                    <div className='DivAcceuil'> 
                        <NavLink to={"http://airneis.fr"} target="_blank" className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="http://airneis.ddns.net:3000/img/logo.svg" alt="" /><span className="texteacceuil">airneis.fr</span></NavLink>
                    </div>
                    <div className='DivAcceuil'> 
                        <NavLink to={"https://drive.google.com/drive/u/1/folders/10EymDAG_qoECA5mrPWekpj1F41l5jJUe"} target="_blank" className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="https://www.onda-dias.eu/cms/wp-content/uploads/2018/05/api.png" alt="" /><span className="texteacceuil">API</span></NavLink>
                    </div>
                    <div className='DivAcceuil'> 
                        <NavLink to={"http://airneis.ddns.net:3000/phpmyadmin/"} target="_blank" className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="https://upload.wikimedia.org/wikipedia/commons/9/95/PhpMyAdmin_logo.png" alt="" /><span className="texteacceuil">BDD (phpmyadmin)</span></NavLink>
                    </div>
                    <div className='DivAcceuil'> 
                        <NavLink to={"/articles"} className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="http://airneis.ddns.net:3000/img/meubles.jpg" alt="" /><span className="texteacceuil">Articles</span> </NavLink>
                    </div>
                    <div className='DivAcceuil'> 
                        <NavLink to={"/categorie"} className={({isActive}) => {return isActive ? "nav-link active text-light" : "nav-link"}}> <img className="logo-airneis-connexion" src="https://cdn-icons-png.flaticon.com/512/2349/2349123.png" alt="" /><span className="texteacceuil">Gestion des categories</span> </NavLink>
                    </div>
                </div>

            </>
            ) : (
            <>
                <Connexion/>
            </>
        )}
    </> );
}

export default Accueil ;