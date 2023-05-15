import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Connexion() {
  const [response, setResponse] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => (formType[key] = formData.get(key)));

    async function postData() {
      try {
        const response = await axios.post('http://airneis.ddns.net:3000/connexion.php', formType, {});
        setResponse(response.data);
        if (response.data.status === "success") {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }

    postData();
  };

  return (
    <>
      <div className="ConnexionTitre">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "nav-link active text-light" : "nav-link";
          }}
        >
          {" "}
          <img className="logo-airneis-connexion" src="logo.svg" alt="" />
          <span className="titreConnexion">Àirneis</span>
        </NavLink>
      </div>

      <div className="login-card">
        <div className="card-header">
          <div className="log">Connexion</div>
        </div>
        <form onSubmit={handleSubmit}>
          {response && (
            <p className="ReponseFormulaire text-center mt-3">
              {response.message}
            </p>
          )}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input required="" name="email" id="email" type="text" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              required=""
              name="password"
              id="password"
              type="password"
            />
          </div>
          <div className="form-group">
            <input value="Se connecter" type="submit" />
          </div>
        </form>
        <div className="text-center">
          <NavLink className="compteNav" to="/inscription">
            Créer un compte ?
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Connexion;
