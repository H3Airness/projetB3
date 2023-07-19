import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataContextProvider } from './assets/composants/context/dataContext';
import Menu from './assets/composants/Menu';
import { loadFonts } from './fonts';
import { AuthProvider } from './assets/composants/context/authContext';
import { InfoCommandeProvider } from './assets/composants/context/InfoCommandeContext';

import Accueil from './assets/composants/front/Accueil';
import Categorie from './assets/composants/front/Categorie';
import Produit from './assets/composants/front/Produit';
import Panier from './assets/composants/front/Panier';
import Recherche from './assets/composants/front/Recherche';
import Connexion from './assets/composants/front/Connexion';
import Inscription from './assets/composants/front/Inscription';
import Livraison from './assets/composants/front/Livraison';
import CGU from './assets/composants/front/CGU';
import MentionLegale from './assets/composants/front/MentionLegale';
import Contact from './assets/composants/front/Contact';
import Propos from './assets/composants/front/Propos';
import MesParam from './assets/composants/front/MesParametres';
import MoyenDePaiement from './assets/composants/front/MoyensDePaiement';
import Adresse from './assets/composants/front/UserAdresses';
import MesCommande from './assets/composants/front/MesCommandes';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <AuthProvider>
      <DataContextProvider>
        <InfoCommandeProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="accueil"
              screenOptions={{
                header: () => <Menu />,
              }}
            >
              <Stack.Screen name="accueil" component={Accueil} />
              <Stack.Screen name="categorie" component={Categorie} />
              <Stack.Screen name="produit" component={Produit} />
              <Stack.Screen name="panier" component={Panier} />
              <Stack.Screen name="recherche" component={Recherche} />
              <Stack.Screen name="connexion" component={Connexion} />
              <Stack.Screen name="inscription" component={Inscription} />
              <Stack.Screen name="livraison" component={Livraison} />
              <Stack.Screen name="cgu" component={CGU} />
              <Stack.Screen name="mentionlegale" component={MentionLegale} />
              <Stack.Screen name="contact" component={Contact} />
              <Stack.Screen name="propos" component={Propos} />
              <Stack.Screen name="mesParam" component={MesParam} />
              <Stack.Screen name="moyenDePaiement" component={MoyenDePaiement} />
              <Stack.Screen name="adresse" component={Adresse} />
              <Stack.Screen name="mesCommande" component={MesCommande} />
            </Stack.Navigator>
          </NavigationContainer>
        </InfoCommandeProvider>
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
