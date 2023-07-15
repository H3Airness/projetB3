import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://airneis.ddns.net:3000/reset_password.php', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Une erreur s\'est produite lors de la tentative de réinitialisation du mot de passe. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="divStyle">
      <form onSubmit={submitForm} className="formStyle">
        <h2>Réinitialiser le mot de passe</h2>
        <input
          type="email"
          placeholder="Entrez votre email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="inputStyle"
        />
        <button type="submit" className="buttonStyle">
          Réinitialiser le mot de passe
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
