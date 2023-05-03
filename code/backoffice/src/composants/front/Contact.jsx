import { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from "../Menu";

const Contact = () => {
    const [donnees, setDonnees] = useState([]);

    useEffect(() => {
        axios.get('http://airneis.ddns.net:3000/back_contact.php')
            .then(response => {
                setDonnees(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ligne ?')) {
          fetch(`http://airneis.ddns.net:3000/back_contact.php?id=${id}`, { method: 'DELETE' })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert('La ligne a été supprimée avec succès.');
                window.location.reload();
              } else {
                alert('Une erreur est survenue lors de la suppression de la ligne.');
              }
            })
            .catch(error => {
              console.error(error);
              alert('Une erreur est survenue lors de la suppression de la ligne.');
            });
        }
      }
      

    return (
        <>
            <Menu />

            <div className="ContactTitre">
                <span>Formulaire de Contact</span>
            </div>

            <div className="tableau_contact">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>Date d'envoie</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Contacter</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donnees.map(donnee => (
                            <tr key={donnee.id}>
                                <td>{donnee.date}</td>
                                <td>{donnee.nom}</td>
                                <td>{donnee.email}</td>
                                <td>{donnee.message}</td>
                                <td>
                                    <center>
                                        <a className="btn btn-warning" href={`mailto:${donnee.email}`}>Envoyer un e-mail</a>
                                    </center>
                                </td>
                                <td>
                                    <center>
                                        <a className="btn btn-danger" href="" onClick={() => handleDelete(donnee.id)}>Supprimer</a>
                                    </center>
                                </td>
                            </tr>
                        ))}                      
                    </tbody>
                </table>

            </div>
        </>
    );
}
 
export default Contact;
