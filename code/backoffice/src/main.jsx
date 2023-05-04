import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import Acceuil from './composants/front/Accueil';
import NotFound from './composants/front/NotFound';
import Connexion from './composants/front/Connexion';
import Contact from './composants/front/Contact';
import MenuNavigation from './composants/front/MenuNavigation'
import Articles from './composants/front/Articles';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
      <Route index element={<Acceuil />} />
      <Route path='connexion' element={<Connexion />} />
      <Route path='articles' element={<Articles />} />
      <Route path='contact' element={<Contact/>} />
      <Route path='menu-navigation' element={<MenuNavigation/>} />
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
