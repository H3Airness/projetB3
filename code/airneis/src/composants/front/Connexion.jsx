import axios from 'axios';
import { NavLink } from "react-router-dom"
import Footer from '../Footer';

function Connexion() {

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
      }}> <img className="logo-airneis-connexion" src="../../public/logo.svg" alt="" /><span className="ConnexionTitre">Àirneis</span></NavLink>
    </div>

  <div className='Min-heightConteiner'>   
    <div className="login-card">
      <div className="card-header">
        <div className="log">Login</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input required="" name="email" id="email" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input required="" name="password" id="password" type="password" />
        </div>
        <div className="form-group">
          <input value="Login" type="submit" />
          </div>
      </form>
    </div>
  </div>    
    </>
  );
}

export default Connexion;
