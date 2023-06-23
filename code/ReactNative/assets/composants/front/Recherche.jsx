import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native';
import axios from 'axios';
import { dataContext } from '../context/dataContext';

const Recherche = () => {
  const [recherche, setRecherche] = useState('');
  const [donnees, setDonnees] = useState([]);
  const [resultats, setResultats] = useState([]);
  const [aucunResultat, setAucunResultat] = useState(false);
  const { ajouter } = useContext(dataContext);

  const handleChange = (value) => {
    setRecherche(value);
  };

  const handleSubmit = () => {
    console.log(`Recherche : ${recherche}`);
    const filtre = recherche.trim().toLowerCase();
    const resultatsFiltres = donnees.filter(
      (donnee) =>
        donnee.nom.toLowerCase().includes(filtre) || donnee.description.toLowerCase().includes(filtre)
    );

    setResultats(resultatsFiltres);
    setAucunResultat(resultatsFiltres.length === 0);
  };

  useEffect(() => {
    axios
      .get('http://airneis.ddns.net:3000/recherche.php')
      .then((response) => {
        setDonnees(response.data);
        setResultats(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderProduit = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => navigation.navigate('produit', { id: item.id })}>
        <Image
          style={styles.cardImage}
          source={{ uri: `http://airneis.ddns.net:3000/img_produit/${item.id}` }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.nom}</Text>
        <Text style={styles.cardPrice}>{item.prix} €</Text>
        <View style={styles.buttonContainer}>
          {item.stock > 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => ajouter(item)}
            >
              <Text style={styles.buttonText}>Ajouter au panier</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.disabledButton} disabled>
              <Text style={styles.buttonText}>Stock épuisé</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}></Text>
      </View>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rechercher des produits"
            value={recherche}
            onChangeText={handleChange}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>
      {aucunResultat && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Aucun résultat trouvé pour votre recherche.</Text>
        </View>
      )}
      <FlatList
        data={resultats}
        renderItem={renderProduit}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </>
  );
};

const styles = {
  headingContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },
  container: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  searchButtonText: {
    color: '#FFF',
  },
  alertContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  alertText: {
    color: 'red',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    flex: 0.5,
    marginBottom: 16,
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
  },
  cardBody: {
    padding: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 14,
    color: 'blue',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  disabledButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#CCC',
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
  },
};

export default Recherche;
