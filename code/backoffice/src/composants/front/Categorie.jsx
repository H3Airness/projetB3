import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categorie = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://airneis.ddns.net:3000/categorie/categorie_acceuil.php')
          .then(response => setCategories(response.data))
          .catch(error => console.log(error));
      }, []);

      const handleDelete = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            axios.delete(`http://airneis.ddns.net:3000/categorie/back_categorie_suppression.php?id=${id}`)
            .then(response => {
                if (response.status === 204) {
                    setDonnees(donnees.filter(donnee => donnee.id !== id));
                    alert('La ligne a été supprimée avec succès.');
                }
            })
            .catch(error => {
                console.log(error);
                alert('erreur');
            });
        }
    };

    return ( <>
        <div className="ContactTitre">
            <span>Gestion Catégorie</span>
        </div>

        <div className="tableau_contact">
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Icon de la catégorie</th>
                        <th>Bannière de la catégorie</th>
                        <th>Nom de la catégorie</th>
                        <th>Id de la catégorie</th>
                        <th>Date d'ajout</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(categorie => (
                        <tr key={categorie.id_categorie}>
                        <td>
                            <center>
                            <img width={100} src={`http://airneis.ddns.net:3000/img/${categorie.nom}/icon.jpg`} alt={`image-${categorie.nom}`} />
                            </center>
                        </td>
                        <td>
                            <center>
                            <img width={400} src={`http://airneis.ddns.net:3000/img/${categorie.nom}/banniere.jpg`} alt={`image-${categorie.nom}`} />
                            </center>
                        </td>
                        <td>{categorie.nom}</td>
                        <td>{categorie.id_categorie}</td>
                        <td>{categorie.date}</td>
                        <td>
                            <center>
                                <Link to={`/modifierCategorie/${categorie.id_categorie}`} className="btn btn-warning">Modifier</Link>
                            </center>
                        </td>
                        <td>
                            <center>
                            <a className="btn btn-danger" href="" onClick={() => handleDelete(categorie.id_categorie)}>Supprimer</a>
                            </center>
                        </td>
                        </tr>
                    ))}                      
                </tbody>
            </table>
        </div>
    </> );
}

export default Categorie ;