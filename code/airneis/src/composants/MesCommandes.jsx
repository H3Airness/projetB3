import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import axios from 'axios';

function MesCommandes() {
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [commandes, setCommandes] = useState([]);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);

  useEffect(() => {
    axios.get(`http://airneis.ddns.net:3000/page-mes-commandes.php?accountId=${accountId}`)
      .then(response => {
        const commandesTrie = response.data.sort((a, b) => new Date(b.date_commande) - new Date(a.date_commande));
        setCommandes(commandesTrie);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des commandes", error);
      });
  }, [accountId]);

  const handleClick = (commande) => {
    if (commandeSelectionnee === commande) {
      setCommandeSelectionnee(null);
    } else {
      setCommandeSelectionnee(commande);
    }
  };

  const annulerCommande = (commande) => {
    axios.post(`http://airneis.ddns.net:3000/annuler-commande.php`, { id: commande.id })
      .then(response => {
        const updatedCommandes = commandes.map(c => {
          if (c.id === commande.id) {
            return { ...c, etat: 'Annulé' };
          }
          return c;
        });
        setCommandes(updatedCommandes);
      })
      .catch(error => {
        console.error("Erreur lors de l'annulation de la commande", error);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          {commandes.length === 0 ? (
            <p>Vous n'avez pas encore de commandes.</p>
          ) : (
            <>
              <h1 style={{ textAlign: 'center' }}>Mes commandes</h1>
              <br />
              <div className="mes-commandes">
                {commandes.map((commande) => (
                  <div key={commande.id} className={`commande-item ${commandeSelectionnee === commande ? 'commande-selected' : ''}`}>
                    <div className={`bouton-commandes ${commande.etat.toLowerCase()}`} onClick={() => handleClick(commande)}>
                      <h4>Commande n° {commande.id} - État : <span style={{ color:'white'}}></span> {commande.etat}</h4>
                      {commande.etat === 'En cours de préparation' && (
                        <button onClick={() => annulerCommande(commande)}>Annuler la commande</button>
                      )}
                    </div>
                    {commandeSelectionnee === commande && (
                      <div className="commande-details">
                        <div>
                          <h2>Détails de la commande</h2>
                          <h5>Commandé le :</h5>
                          <h6>Nombre d'articles : <strong>{commande.nombre_articles}</strong></h6>
                          <h6>Prix total : <strong>{commande.prix_total}€</strong></h6>
                          <hr />
                          <h4>Articles :</h4>
                          {/* Afficher les articles de la commande ici */}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <p>Vous devez vous connecter pour voir vos commandes.</p>
      )}
    </>
  );
}

export default MesCommandes;
