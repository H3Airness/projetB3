import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataContextProvider } from './assets/composants/context/dataContext';
import Menu from './assets/composants/Menu';
import Footer from './assets/composants/Footer';

import Accueil from './assets/composants/front/Accueil';
import CGU from './assets/composants/front/CGU';

const Stack = createStackNavigator();

function App() {
  return (
    <DataContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            header: () => <Menu />, // Utilisez votre composant Menu comme en-tête
            footer: () => <Footer />, // Utilisez votre composant Footer comme pied de page
          }}
        >
          <Stack.Screen name="Home" component={Accueil} />
          <Stack.Screen name="Details" component={CGU} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataContextProvider>
  );
}

export default App;
