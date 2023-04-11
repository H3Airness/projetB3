import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Inscription() {
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => formType[key] = formData.get(key));

    console.log(formType);

    async function postData() {
      try {
        const response = await axios.post('http://airneis.fr/inscription.php', formType, {});
        console.log(response.data);
        setResponse(response.data);
        if (response.data.status === 'success') {
          navigate('/connexion');
        } 
      } catch (error) {
        console.log(error);
      }
    }

    postData();
  }

  return (
    <>
    <div className='ConnexionTitre'> 
    <NavLink to="/" className={({isActive}) => {
        return isActive ? "nav-link active text-light" : "nav-link"
      }}> <img className="logo-airneis-connexion" src="../../public/logo.svg" alt="" /><span className="titreConnexion">Àirneis</span>
    </NavLink>
    </div>

  <div className='Min-heightConteiner'>   
    <div className="login-card mb-3">
      <div className="card-header">
        <div className="log">Inscription</div>
      </div>
      <form onSubmit={handleSubmit}>
      {response && <p className='ReponseFormulaire text-center mt-3'>{response.message}</p>}
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input required="" name="nom" id="nom" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input required="" name="email" id="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input required="" name="password" id="password" type="password" />
        </div>
        <div className="form-group">
          <label htmlFor="ConfirmPassword">Confirmer mot de passe:</label>
          <input required="" name="password2" id="password2" type="password" />
        </div>
        <div className="form-group">
          <input value="Login" type="submit" />
        </div>
        <div className="text-center">
        <NavLink className="compteNav" to="/connexion">Vous avez déjà un compte ?</NavLink>
        </div>
      </form>
    </div>
  </div>    
    </>
  );
}

export default Inscription;
