import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserAdresses = ({ accountId }) => {
    const [loading, setLoading] = useState(true);
    const [accountInfo, setAccountInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch livraison data
                const livraisonRes = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
                if (livraisonRes.data.status === 'success') {
                    setAccountInfo(livraisonRes.data.accountLivraison);
                    setLoading(false);
                } else {
                    console.error('Erreur lors de la récupération des données du compte: ', livraisonRes.data.message);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données du compte: ', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [accountId]);

    if (loading) {
        return <div>Chargement...</div>
    }

    if (!accountInfo) {
        return <div>Impossible de charger les informations du compte</div>
    }

    return (
        <div>
            <h2>Adresse de livraison</h2>
            <p>{accountInfo.adresse_livraison}, {accountInfo.code_postal_livraison}, {accountInfo.ville_livraison}, {accountInfo.pays}</p>

            <h2>Adresse de facturation</h2>
            <p>{accountInfo.adresse_facturation}, {accountInfo.code_postal_facturation}, {accountInfo.ville_facturation}, {accountInfo.pays_facturation}</p>
        </div>
    );
};

export default UserAdresses;
