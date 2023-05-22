import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";

const Carousel = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://airneis.ddns.net:3000/carousel/affichage_carousel.php')
          .then(response => setImages(response.data))
          .catch(error => console.log(error));
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
            try {
                // Requête GET pour vérifier si l'ID correspond à un chiffre dans la table "produit"
                const response = await axios.get(`http://airneis.ddns.net:3000/categorie/verifier_id_suppression.php?id=${id}`);

                if (response.data.error) {
                    // L'ID correspond à un chiffre dans la table "produit", afficher l'erreur
                    alert(response.data.error);
                } else {
                    axios.delete(`http://airneis.ddns.net:3000/categorie/categorie_suppression.php?id=${id}`)
                        .then(response => {
                            if (response.status === 204) {
                                alert('La catégorie a été supprimée avec succès.');
                                // Actualiser la liste des catégories après la suppression
                                setCategories(categories.filter(categorie => categorie.id_categorie !== id));
                            }
                        })
                        .catch(error => {
                            console.log(error);
                            alert('Une erreur s\'est produite lors de la suppression de la catégorie.');
                        });
                }
            } catch (error) {
                console.log(error);
                alert('Une erreur s\'est produite lors de la vérification de la catégorie.');
            }
        }
    };

    return (
        <>
            {isLoggedIn ? (
                <>
                    <div className="ContactTitre">
                        <span>Gestion Catégorie</span>
                        <br />
                        <Link to={`/AjoutCarousel`} className="btn btn-success">Ajouter une nouvelle image</Link>
                    </div>

                    <div className="tableau_contact">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Id de L'image</th>
                                    <th>Date d'ajout</th>
                                    <th>Modifier</th>
                                    <th>Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {images.map(image => (
                                    <tr key={image.id}>
                                        <td>
                                            <center>
                                                <img width={500} src={`http://airneis.ddns.net:3000/img/carousel/${image.id}.jpg`} alt={`image-${image.id}`} />
                                            </center>
                                        </td>
                                        <td>{image.id}</td>
                                        <td>{image.date}</td>
                                        <td>
                                            <center>
                                                <Link to={`/modifierCategorie/${image.id}`} className="btn btn-warning">Modifier</Link>
                                            </center>
                                        </td>
                                        <td>
                                            <center>
                                                <button className="btn btn-danger" onClick={() => handleDelete(image.id)}>Supprimer</button>
                                            </center>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    <Connexion />
                </>
            )}
        </>
    );
}

export default Carousel;
