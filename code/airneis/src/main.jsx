import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import Acceuil from './composants/front/Accueil';
import Panier from './composants/front/Panier';
import Recherche from './composants/front/Recherche';
import NotFound from './composants/front/NotFound';
import Connexion from './composants/front/Connexion';
import MentionLegale from './composants/front/MentionLegale';
import CGU from './composants/front/CGU';
import Contact from './composants/front/Contact';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
      <Route index element={<Acceuil />} />
      <Route path='panier' element={<Panier />} />
      <Route path='recherche' element={<Recherche />} />
      <Route path='connexion' element={<Connexion />} />
      <Route path='mention-legale' element={<MentionLegale/>} />
      <Route path='CGU' element={<CGU/>} />
      <Route path='contact' element={<Contact/>} />
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
