import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
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
        <div>
          <div className="contact-log">Information de contact</div>
          <div className="icon-contact"><FontAwesomeIcon icon={faMapMarkerAlt} />  27-33 Av. des Champs-Élysées <br/> &nbsp; &nbsp; &nbsp; 75008,Paris, France</div><br></br>
          <div className="icon-contact"><FontAwesomeIcon icon={faEnvelope} />  airneis@hotmail.com</div><br/>
          <div className="icon-contact"><FontAwesomeIcon icon={faPhone} />  01 00 00 00 00</div>
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
                <textarea required="" name="message" id="message" type="text" />
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
