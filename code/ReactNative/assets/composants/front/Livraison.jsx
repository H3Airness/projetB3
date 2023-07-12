import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { dataContext } from '../context/dataContext';
import { styles } from '../../../Styles';

const Livraison = () => {
  const { ajouter, panier, retirer, supprimer, nombreProduits, getTotalProduit, getTotalPanier } = useContext(dataContext);
  const { isLoggedIn } = useContext(AuthContext);
  const navigation = useNavigation();

  const [livraisonInfo, setLivraisonInfo] = useState({
    prenom: '',
    nom: '',
    adresse: '',
    adresse2: '',
    ville: '',
    codePostal: '',
  });

  const handlePayer = () => {
    if (!isLoggedIn) {
      alert('Veuillez vous connecter !');
    } else {
      navigation.navigate('livraison');
    }
  };

  const handleLivraisonInfoChange = (field, value) => {
    setLivraisonInfo({ ...livraisonInfo, [field]: value });
  };

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.headingPanier}>Livraison</Text>

      {/* Liste des informations de livraison */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoHeading}>Informations de livraison</Text>
        <TextInput
          style={styles.input}
          value={livraisonInfo.prenom}
          onChangeText={(value) => handleLivraisonInfoChange('prenom', value)}
          placeholder="Prénom"
        />
        <TextInput
          style={styles.input}
          value={livraisonInfo.nom}
          onChangeText={(value) => handleLivraisonInfoChange('nom', value)}
          placeholder="Nom"
        />
        <TextInput
          style={styles.input}
          value={livraisonInfo.adresse}
          onChangeText={(value) => handleLivraisonInfoChange('adresse', value)}
          placeholder="Adresse"
        />
        <TextInput
          style={styles.input}
          value={livraisonInfo.adresse2}
          onChangeText={(value) => handleLivraisonInfoChange('adresse2', value)}
          placeholder="Complément d'adresse"
        />
        <TextInput
          style={styles.input}
          value={livraisonInfo.ville}
          onChangeText={(value) => handleLivraisonInfoChange('ville', value)}
          placeholder="Ville"
        />
        <TextInput
          style={styles.input}
          value={livraisonInfo.codePostal}
          onChangeText={(value) => handleLivraisonInfoChange('codePostal', value)}
          placeholder="Code Postal"
        />
      </View>

      <TouchableOpacity style={styles.payerButton} onPress={handlePayer}>
        <Text style={styles.payerButtonText}>PASSER AU PAIEMENT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Livraison;
