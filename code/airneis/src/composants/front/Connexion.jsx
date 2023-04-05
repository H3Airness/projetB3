import axios from 'axios';
import { NavLink } from "react-router-dom"
import { useState } from "react";

function Connexion() {
  const [response, setResponse] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => formType[key] = formData.get(key));

    console.log(formType);


    axios.post('http://localhost/API.php', formType, {
       headers: {
        'Content-Type' : 'application/json',
       }
    }).then(response => {
      console.log(response.data);
      setResponse(response.data);
    }).catch(error => {
      console.log(error);
    });
  }

  return (
    <>
    <div className='ConnexionTitre'> 
      <NavLink to="/" className={({isActive}) => {
        return isActive ? "nav-link active text-light" : "nav-link"
      }}> <img className="logo-airneis-connexion" src="../../public/logo.svg" alt="" /><span className="titreConnexion">Àirneis</span></NavLink>
    </div>

  <div className='Min-heightConteiner'>   
    <div className="login-card">
      <div className="card-header">
        <div className="log">Login</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input required="" name="email" id="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input required="" name="password" id="password" type="password" />
        </div>
        <div className="form-group">
          <input value="Login" type="submit" />
        </div>
        <NavLink className="compteNav" to="/inscription">Vous voulez crée un compte ?</NavLink>
        {response && <p className='ReponseFormulaire text-center mt-3'>{response.message}</p>}
      </form>
    </div>
  </div>    
    </>
  );
}

export default Connexion;
