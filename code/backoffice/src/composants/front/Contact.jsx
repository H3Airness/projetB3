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

            <div className="donnees">
                <h2>Données:</h2>
                <ul>
                    {donnees.map(donnee => (
                        <li key={donnee.id}>{donnee.nom} - {donnee.email} <a href="mailto:{donnee.email}">Envoyer un e-mail</a>- {donnee.message} - {donnee.date}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}
 
export default Contact;
