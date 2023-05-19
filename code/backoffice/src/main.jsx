import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import Acceuil from './composants/front/Accueil';
import NotFound from './composants/front/NotFound';
import Connexion from './composants/front/Connexion';
import Contact from './composants/front/Contact';
import MenuNavigation from './composants/front/MenuNavigation';
import Articles from './composants/front/Articles';
import AjouterArticles from './composants/front/AjouterArticles';
import Categorie from './composants/front/Categorie';
import ModifierCategorie from './composants/front/ModifierCategorie';
import AjouterCategorie from './composants/front/AjouterCategorie';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Acceuil />} />
        <Route path='connexion' element={<Connexion />} />
        <Route path='articles' element={<Articles />} />
        <Route path='contact' element={<Contact />} />
        <Route path='menu-navigation' element={<MenuNavigation />} />
        <Route path='ajouter-articles' element={<AjouterArticles />} />
        <Route path='categorie' element={<Categorie />} />
        <Route path='modifierCategorie/:categorie' element={<ModifierCategorie/>} />
        <Route path='AjouterCategorie' element={<AjouterCategorie/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
