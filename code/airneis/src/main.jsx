import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

<<<<<<< Updated upstream
import Home from './composants/front/Accueil';
=======
import Acceuil from './composants/front/Accueil';
>>>>>>> Stashed changes
import Panier from './composants/front/Panier';
import Recherche from './composants/front/Recherche';
import NotFound from './composants/front/NotFound';
import Connexion from './composants/front/Connexion';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
      <Route index element={<Acceuil />} />
      <Route path='panier' element={<Panier />} />
      <Route path='recherche' element={<Recherche />} />
      <Route path='connexion' element={<Connexion />} />
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
