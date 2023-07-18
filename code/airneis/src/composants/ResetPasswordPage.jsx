import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    fetch(`http://airneis.ddns.net:3000/compte.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setAccountInfo(data.accountInfo);
      });
  }, [id]);


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    // Envoie une requête POST à l'API
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, password: password })
  };

  fetch('http://airneis.ddns.net:3000/reset_password.php', requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
          setMessage('Votre mot de passe a été réinitialisé avec succès.');
      } else {
          setMessage('Il y a eu une erreur lors de la réinitialisation de votre mot de passe.');
      }
    });
  };


  return (
    <div>
      <h1>Réinitialiser le mot de passe</h1>
      {accountInfo && accountInfo.reset == 1 ? (
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le nouveau mot de passe"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {message && <p>{message}</p>}
        <button type="submit">
          Mettre à jour le mot de passe
        </button>
      </form>
      ) : (
        <div>
          <p>lien de réinitialisation obsolète</p>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
