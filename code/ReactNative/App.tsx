import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataContextProvider } from './assets/composants/context/dataContext';
import Menu from './assets/composants/Menu';
import { loadFonts } from './fonts';
import { AuthProvider } from './assets/composants/context/authContext'; // Import du AuthProvider

import Accueil from './assets/composants/front/Accueil';
import Categorie from './assets/composants/front/Categorie';
import Produit from './assets/composants/front/Produit';
import Panier from './assets/composants/front/Panier';
import Recherche from './assets/composants/front/Recherche';
import CGU from './assets/composants/front/CGU';

const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  return (
    <AuthProvider>
      <DataContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="accueil"
            screenOptions={{
              header: () => <Menu />, // Utilisez votre composant Menu comme en-tête
            }}
          >
            <Stack.Screen name="accueil" component={Accueil} />
            <Stack.Screen name="categorie" component={Categorie} />
            <Stack.Screen name="produit" component={Produit} />
            <Stack.Screen name="panier" component={Panier} />
            <Stack.Screen name="recherche" component={Recherche} />
            <Stack.Screen name="cgu" component={CGU} />
          </Stack.Navigator>
        </NavigationContainer>
      </DataContextProvider>
    </AuthProvider>
  );
}

export default App;
