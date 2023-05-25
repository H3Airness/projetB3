import axios from 'axios';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

const AjouterArticles = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('');
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState('');

  useEffect(() => {
    axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('prix', prix);
    formData.append('categorie', categorie);
    formData.append('image', image, 'image.jpg');
    formData.append('stock', stock);
  
    try {
        const response = await axios.post('http://airneis.ddns.net:3000/ajout_produit.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResponse('Produit ajouté avec succès');
      }
    catch (error) {
    console.log(error);
    setResponse('Erreur lors de l\'envoi des données');
    }
  };

  const handleNomChange = (e) => {
    setNom(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePrixChange = (e) => {
    setPrix(e.target.value);
  };

  const handleCategorieChange = (e) => {
    setCategorie(e.target.value);
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };
  
return (
  <>
    {isLoggedIn ? (
      <>
        <div className="card">
          <div className="card-header center">
            <div className="card-title text-center display-5 mb-5 ContactTitre">Ajouter un article</div>

            <hr/>
          
            <form onSubmit={handleSubmit}>
              {response && <p className='ReponseFormulaire text-center mt-3'>{response.message}</p>}
                <div className="mb-4">
                  <label htmlFor="nom">Nom:</label>
                  <input name="nom" id="nom" type="text" placeholder="Titre de l'article" required onChange={handleNomChange}/>
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="nom">Description:</label>
                  <br/>
                  <textarea name="description" id="description" rows="4" placeholder="Description de l'article" className="form-textarea" required onChange={handleDescriptionChange}></textarea>
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="nom">Prix:</label>
                  <input type="number" name="prix" id="prix" min="0" step="0.01" placeholder="Prix de l'article" required onChange={handlePrixChange}/>
                </div> 

                <div className="articles-card-group mb-4">
                  <label htmlFor="choix-item">Selectionnez une catégorie: &emsp;</label>
                    <select name="select" id="choix-item" required onChange={handleCategorieChange}>
                      {categories.map(categorie => (
                      <option value={categorie.id_categorie} key={categorie.id_categorie}>{categorie.nom}</option>
                      ))}
                    </select>
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="image">Selectionnez une image:</label>
                  <input type="file" id='ImageArticle' required onChange={handleImageChange}/>      
                </div>

                <div className="articles-card-group mb-4">
                  <label htmlFor="stock">Stock:</label>
                  <input type="number" name="stock" id="stock" min="0" placeholder="Stock de l'article" required onChange={handleStockChange}/>      
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
