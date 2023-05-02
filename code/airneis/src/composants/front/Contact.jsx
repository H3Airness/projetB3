import axios from "axios";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Menu from "../Menu";

function Contact() {
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => (formType[key] = formData.get(key)));

    async function postData() {
      try {
        const response = await axios.post(
          "http://airneis.fr:3000/contact.php",
          formType,
          {}
        );
        setResponse(response.data);

      } catch (error) {
        console.log(error);
      }
    }

    postData();
  };

  return (
    <>
      <Menu />

      <div className="ContactTitre">
          <span>Formulaire de Contact</span>
      </div>

      <div className="cat">
        <div className="Contact-Info">
        <div className="contact-log">Information de contact</div>
          <p className="contact-text">
          27-33 Av. des Champs-Élysées<br></br>
          75008,Paris, France.<br></br>
          airneis@hotmail.com
          </p>   
        </div>


        <div className="Min-heightConteiner">
          <div className="contact-card">
            <div className="card-header">
              <div className="contact-log">Envoyer nous un message</div>
            </div>
            <form onSubmit={handleSubmit}>
              {response && (
                <p className="ReponseFormulaire text-center mt-3">
                  {response.message}
                </p>
              )}
              <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input required="" name="nom" id="nom" type="text" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input required="" name="email" id="email" type="text" />
              </div>

              <div className="form-message">
                <label htmlFor="message">Message:</label>
                <input required="" name="message" id="message" type="text" />
              </div>
              
              <div className="form-group">
                <input value="Envoyer" type="submit" />
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
