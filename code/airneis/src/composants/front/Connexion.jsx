import { useState } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom"

function Connexion() {

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let formType = {};
    formData.forEach((value, key) => formType[key] = formData.get(key));

    console.log(formType);
  }

  return (
    <>
  <div className='ConnexionTitre'> 
    <NavLink to="/" className={({isActive}) => {
      return isActive ? "nav-link active text-light" : "nav-link"
    }}><span className="navbar-brand fs-3">Àirneis</span></NavLink>
  </div>

  <div class="login-card">
    <div class="card-header">
      <div class="log">Login</div>
    </div>
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="username">Email:</label>
        <input required="" name="email" id="email" type="text" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input required="" name="password" id="password" type="password" />
      </div>
      <div class="form-group">
        <input value="Login" type="submit" />
        </div>
    </form>
  </div>

    </>
  );
}

export default Connexion;
