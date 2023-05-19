import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ModifierCategorie() {
    const [response, setResponse] = useState('');
    const { categorie } = useParams();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      axios.get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${categorie}`)
        .then(response => setCategories(response.data))
        .catch(error => console.log(error));
    }, []);

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
 
    return (
      <>
        {categories.map((categorie) => (
          <div key={categorie.nom}>
            <img src={`http://airneis.ddns.net:3000/img/${categorie.nom}/banniere.jpg`} alt={categorie.nom} style={{ width: '100%' }} />
          </div>
          ))}

        {categories.map((categorie) => (
        <div className="categorie-card">
            <div className="card-header">
                <div className="card-title text-center display-5 mb-5 ContactTitre">Modifier la catégorie: {categorie.nom}</div>
            </div>
            <form onSubmit={handleSubmit}>
                {response && <p className='ReponseFormulaire text-center mt-3'>{response.message}</p>}

                <div className="card-group">
                    <input required={categorie.nom} name="nom" id="nom" type="text" placeholder="Nom de la catégorie"/>
                </div>

                <div className="custom-select">

                <input type="file" id='ImageArticle'/>        
                </div>
                <input value="Ajouter" type="submit" />
            </form>
        </div>
        ))}
        <div className="d-flex justify-content-center my-3">
            <NavLink to="/categorie" className='boutonBackOfficeArticles btn btn-success'> Revenir aux gestionnaire de Catégorie </NavLink>
        </div> 
           
      </>
    );
  }
  
  export default ModifierCategorie;