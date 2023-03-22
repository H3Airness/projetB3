import axios from 'axios';
import { NavLink } from "react-router-dom"

function Inscription() {

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => formType[key] = formData.get(key));

    console.log(formType);

    axios.post('http://localhost:8001/enquiry.php', formType, {
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
          <label htmlFor="email">Email:</label>
          <input required="" name="email" id="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input required="" name="nom" id="nom" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prenom</label>
          <input required="" name="prenom" id="prenom" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input required="" name="password" id="password" type="password" />
        </div>
        <div className="form-group">
          <label htmlFor="ConfirmPassword">Confirmé mot de passe:</label>
          <input required="" name="password" id="password" type="password" />
        </div>
        <div className="form-group">
          <input value="Login" type="submit" />
        </div>
        <NavLink to="/connexion">Connectez vous ici !</NavLink>
      </form>
    </div>
  </div>    
    </>
  );
}

export default Inscription;
