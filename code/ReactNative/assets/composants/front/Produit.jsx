import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';
import { dataContext } from '../context/dataContext';
import { styles } from '../../../Styles';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function Produit() {
  const navigation = useNavigation();

  const { params } = useRoute();
  const { id } = params;

  const [categories, setCategories] = useState([]);
  const [produit, setProduct] = useState(null);
  const [produits, setProducts] = useState([]);
  const { ajouter } = useContext(dataContext);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    axios
      .get(`http://airneis.ddns.net:3000/produit.php?id=${id}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data.categorie);
        setProduct(data);
        if (data && data.categorie) {
          axios
            .get(`http://airneis.ddns.net:3000/categorie/affichage_categorie.php?categorie=${data.categorie}`)
            .then((response) => {
              console.log(response.data);
              setCategories(response.data);
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://airneis.ddns.net:3000/categorie/categorie.php?categorie=${produit?.categorie}`)
      .then((response) => {
        console.log(response.data);
        const shuffledProducts = shuffleArray(response.data);
        const filteredProducts = shuffledProducts.filter((p) => p.id !== produit.id);
        setProducts(filteredProducts.slice(0, 3));
      })
      .catch((error) => console.error(error));
  }, [produit]);

  const handleInteraction = () => {
    setAutoplay(false);
  };

  if (!produit) {
    return <Text>Chargement...</Text>;
  }

  return (
    <View>
      {categories.length > 0 && categories[0] && (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Categorie', { categorie: categories[0].id_categorie })}>
            <Image
              source={{ uri: `http://airneis.ddns.net:3000/img_categorie/${categories.id_categorie}banniere.jpg` }}
              style={styles.banniereImage}
            />
          </TouchableOpacity>

          <View style={styles.catContainer}>
            <View style={{ alignItems: 'center' }}>
              <Carousel
                data={[
                  { id: 1, source: `http://airneis.ddns.net:3000/img_produit/${produit.id}.jpg` },
                  { id: 2, source: `http://airneis.ddns.net:3000/img_produit/${produit.id}-2.jpg` },
                  { id: 3, source: `http://airneis.ddns.net:3000/img_produit/${produit.id}-3.jpg` },
                ]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={handleInteraction}>
                    <Image source={{ uri: item.source }} style={{ width: Dimensions.get('window').width-100, height: Dimensions.get('window').width-100 }} />
                  </TouchableOpacity>
                )}
                sliderWidth={300}
                itemWidth={200}
                autoplay={autoplay}
                autoplayInterval={5000}
                loop
                enableSnap
                activeSlideAlignment="start"
              />
            </View>

            <View style={styles.descriptionContainer}>
              <View style={styles.catInfoContainer}>
                <View style={styles.prix}><Text>{produit.prix}€</Text></View>
                <View style={styles.titreProduit}><Text>{produit.nom}</Text></View>
              </View>

              <View style={styles.stockContainer}>
                {produit.stock > 1 ? (
                  <Text>En stock</Text>
                ) : null}

                {produit.stock === 1 ? (
                  <Text >Plus que 1 produit en stock !</Text>
                ) : null}

                {produit.stock === 0 ? (
                  <Text>Stock épuisé</Text>
                ) : null}
              </View>

              <Text>{produit.description}</Text>

              <View style={styles.buttonContainer}>
                {produit.stock > 0 ? (
                  <TouchableOpacity style={styles.ajouterButton} onPress={() => ajouter(produit)}>
                    <Text style={styles.ajouterButtonText}>Ajouter au panier</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.stockEpuiseButton} disabled>
                    <Text style={styles.stockEpuiseButtonText}>Stock épuisé</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          <Text style={{marginTop: 100}}>Produits similaires</Text>

          <View style={styles.container}>
            <View style={styles.row}>
              {produits.map((produit) => (
                <View style={styles.produitContainer} key={produit.id}>
                  <TouchableOpacity onPress={() => navigation.navigate('produit', { id: produit.id })}>
                    <Image
                      source={{ uri: `http://airneis.ddns.net:3000/img_produit/${produit.id}` }}
                      style={{ width: '100%' }}
                      alt={produit.titre}
                    />
                  </TouchableOpacity>

                  <View style={styles.produitInfo}>
                    <Text style={styles.produitTitre}>{produit.nom}</Text>
                    <Text style={styles.produitPrix}>{produit.prix}€</Text>

                    {produit.stock > 0 ? (
                      <TouchableOpacity style={styles.ajouterButton} onPress={() => ajouter(produit)}>
                        <Text style={styles.ajouterButtonText}>Ajouter au panier</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity style={styles.stockEpuiseButton} disabled>
                        <Text style={styles.stockEpuiseButtonText}>Stock épuisé</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default Produit;
