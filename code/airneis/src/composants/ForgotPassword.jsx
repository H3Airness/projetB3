import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import axios from 'axios'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  // nouvel état

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // soumission en cours

    const response = await axios.get(`http://airneis.ddns.net:3000/select_email.php?email=${email}`);

    const { id } = response.data;

    const templateParams = {
      to_email: email,
      reset_link: `http://airneis.fr/reset-password/${id}`,
      account_id: id,
    };


    emailjs
      .send('service_4l8nscb', 'template_0edzpqi', templateParams, 'dLcg7jZT153kwwuzg')
      .then(
        () => {
          setMessage('Un lien de réinitialisation de mot de passe a été envoyé à votre adresse email si elle existe.');
          setSuccess(true); 
        },
        (error) => {
          console.error('Une erreur est survenue lors de l\'envoi de l\'email:', error);
          setSuccess(false); 
        }
      )
      .finally(() => {
        setIsSubmitting(false); 
      });
  };

  return (
    <div className="forgot-password">
      <h1>Réinitialisation du mot de passe</h1>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          Réinitialiser le mot de passe
        </button>
      </form>
      {message && <p className={success ? 'success-message' : ''}>{message}</p>} 
    </div>
  );
};

export default ForgotPassword;
