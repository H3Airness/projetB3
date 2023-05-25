import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

const AjouterArticles = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    // Ajouter l'image à FormData
    formData.append('image', image);
  
    let formType = {};
    formData.forEach((value, key) => formType[key] = formData.get(key));
  
    async function postData() {
      try {
        const response = await axios.post('/public', formType, {});
        setResponse(response.data);
        if (response.data.status === 'success') {
          navigate('/');
        } 
      } catch (error) {
        console.log(error);
      }
    }
  
    postData();
  }
  
  const handleImageChange = e => {
    e.preventDefault();
    const formDataImage = new FormData();
      
    // Ajouter l'image à FormData
    formDataImage.append('image', e.target.files[0]);
  
    axios.post('/public', formDataImage);
      
    // Stocker l'image dans le state
    setImage(e.target.files[0]);
  };  
  
return (
  <>
    {isLoggedIn ? (
      <>
        <div className="card">
          <div className="card-header">
            <div className="card-title text-center display-5 mb-5 ContactTitre">Ajouter un article</div>
          
            <form onSubmit={handleSubmit}>
              {response && <p className='ReponseFormulaire text-center mt-3'>{response.message}</p>}
                <div className="mb-4">
                  <input required="" name="nom" id="nom" type="text" placeholder="Titre de l'article"/>
                </div>
                <div className="articles-card-group">
                  <textarea name="description" id="description" rows="4" placeholder="Description de l'article"></textarea>
                </div>
                <div className="articles-card-group">
                  <input type="number" name="prix" id="prix" min="0" step="0.01" placeholder="Prix de l'article" required />
                </div>    
                <div className="custom-select">
                  <label htmlFor="choix-item">Selectionnez une catégorie:</label>
                  <select name="select" id="choix-item">
                    <option value="chaise">Chaise</option>
                    <option value="table">Table</option>
                    <option value="lit">Lit</option>
                    <option value="armoire">Armoire</option>
                    <option value="bureau">Bureau</option>
                    <option value="fauteuil">Fauteuil</option>
                  </select>
                  <input type="file" onChange={handleImageChange} id='ImageArticle'/>        
                </div>
                <input value="Ajouter" type="submit" />
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <NavLink to="/articles" className='boutonBackOfficeArticles btn btn-success'> Revenir aux articles </NavLink>
          </div>
        </>
        ) : (
        <>
          <Connexion/>
        </>
      )}   
    </>
  );
}

export default AjouterArticles;
