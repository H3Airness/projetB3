import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AjouterArticles = () => {
    const [response, setResponse] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
    
        let formType = {};
        formData.forEach((value, key) => formType[key] = formData.get(key));
        
    
        async function postData() {
          try {
            const response = await axios.post('http://airneis.ddns.net:3000/connexion.php', formType, {});
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
  
  return (
    <>
        <div className="login-card mt-5">
            <div className="card-header">
                <div className="log">Ajouter un article</div>
            </div>
            <form onSubmit={handleSubmit}>
                {response && <p className='ReponseFormulaire text-center mt-3'>{response.message}</p>}
                <div className="form-group">
                    <label htmlFor="nom">nom:</label>
                    <input required="" name="nom" id="nom" type="text"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">description:</label>
                    <textarea name="description" id="description" rows="4"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="prix">Prix:</label>
                    <input type="age" name="prix" id="prix" min="0" step="0.01" required />
                </div>    
                <div className="form-group">
                    <label htmlFor="choix-item">Selectionnez une catégorie:</label>
                        <select name="choix-item" id="choix-item">
                            <option value="chaise">Chaise</option>
                            <option value="table">Table</option>
                            <option value="lit">Lit</option>
                            <option value="armoire">Armoire</option>
                            <option value="bureau">Bureau</option>
                            <option value="fauteuil">Fauteuil</option>
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image :</label>
                    <input type="file" name="image" id="image" accept="image/*" />
                </div>
                <input value="Ajouter" type="submit" />
            </form>
        </div>
        <div className="d-flex justify-content-center my-3">
            <NavLink to="/articles" className='boutonBackOfficeArticles btn btn-success'> Revenir aux articles </NavLink>
        </div>    
        </>
    );
}

export default AjouterArticles;
