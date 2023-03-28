import axios from 'axios';
import { NavLink } from "react-router-dom"

function Inscription() {

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => formType[key] = formData.get(key));

    console.log(formType);

    axios.post('https://airnes.000webhostapp.com/inscription.php', formType, {
       headers: {
        'Content-Type' : 'application/json',
       }
    }).then( response => console.log(response) );
  }

  return (
    <>
    <div className='ConnexionTitre'> 
    <NavLink to="/" className={({isActive}) => {
        return isActive ? "nav-link active text-light" : "nav-link"
      }}> <img className="logo-airneis-connexion" src="../../public/logo.svg" alt="" /><span className="ConnexionTitre">Àirneis</span>
    </NavLink>
    </div>

  <div className='Min-heightConteiner'>   
    <div className="login-card">
      <div className="card-header">
        <div className="log">Inscription</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
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
        <NavLink className="compteNav" to="/connexion">Vous avez déjà un compte ?</NavLink>
      </form>
    </div>
  </div>    
    </>
  );
}

export default Inscription;
