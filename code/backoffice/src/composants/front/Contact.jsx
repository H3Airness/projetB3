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

    return (
        <>
            <Menu />

            <div className="ContactTitre">
                <span>Formulaire de Contact</span>
            </div>

            <div className="tableau_contact">
                <table>
                    <thead>
                        <tr>
                            <th>Date d'envoie</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Contacter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donnees.map(donnee => (
                            <tr key={donnee.id}>
                                <td>{donnee.date}</td>
                                <td>{donnee.nom}</td>
                                <td>{donnee.email}</td>
                                <td>{donnee.message}</td>
                                <td><a href="mailto:{donnee.email}">Envoyer un e-mail</a></td>
                            </tr>
                        ))}                      
                    </tbody>
                </table>

            </div>
        </>
    );
}
 
export default Contact;
