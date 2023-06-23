import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/authContext';
import { dataContext } from '../context/dataContext';

const Panier = () => {
  const { ajouter, panier, retirer, supprimer, nombreProduits, getTotalProduit, getTotalPanier } =
    useContext(dataContext);
  const { isLoggedIn } = useContext(AuthContext);
  console.log('Contenu du panier:', panier);
  const navigation = useNavigation();

  const handlePayer = () => {
    if (!isLoggedIn) {
      alert('Veuillez vous connecter !');
    } else {
      navigation.navigate('Livraison');
    }
  };

  return (
    <>
      <Text style={styles.heading}>Récapitulatif de mon Panier</Text>
      <View style={styles.container}>
        <View style={styles.articleContainer}>
          {panier.length === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text>Votre panier est vide. ☹️</Text>
              <TouchableOpacity
                style={styles.catalogueButton}
                onPress={() => navigation.navigate('recherche')}
              >
                <Text style={styles.catalogueButtonText}>Voir notre catalogue</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.table}>
            {panier.map((produit) => (
                
              <View key={produit.id} style={styles.tableRow}>
                <Image
                  style={styles.productImage}
                  source={{ uri: `http://airneis.ddns.net:3000/img_produit/${produit.id}` }}
                />

                <View style={styles.productDetails}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    disabled={produit.quantite === 1}
                    onPress={() => retirer(produit)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{produit.quantite}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    disabled={produit.quantite >= produit.stock}
                    onPress={() => ajouter(produit)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                  {produit.quantite >= produit.stock && (
                    <Text style={styles.stockErrorText}>Quantité en stock insuffisante</Text>
                  )}
                </View>

                <Text style={styles.productPrice}>
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(getTotalProduit(produit))}
                </Text>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => supprimer(produit)}
                >
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceHeading}>Total à payer</Text>
          {panier.length > 0 ? (
            <View>
              <Text>
                Tarif {nombreProduits > 1 && `pour (${nombreProduits} articles)`}:&nbsp;
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(getTotalPanier())}
              </Text>
              <Text>Livraison: 10€</Text>
              <View style={styles.totalPrice}>
                <Text style={styles.totalPriceText}>
                  Total:{' '}
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(getTotalPanier() + 10)}
                </Text>
              </View>
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.orderButton}
            onPress={handlePayer}
            disabled={panier.length <= 0}
          >
            <Text style={styles.orderButtonText}>Passer la commande</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = {
  heading: {
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  articleContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  articleHeading: {
    textAlign: 'center',
    marginBottom: 5,
  },
  emptyCartContainer: {
    alignItems: 'center',
  },
  catalogueButton: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  catalogueButtonText: {
    color: '#fff',
  },
  table: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
  },
  quantityText: {
    marginHorizontal: 10,
  },
  stockErrorText: {
    color: 'red',
  },
  productPrice: {
    flex: 1,
    textAlign: 'center',
  },
  deleteButton: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'red',
  },
  priceContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f8f9fa',
  },
  priceHeading: {
    textAlign: 'center',
    marginBottom: 10,
  },
  totalPrice: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalPriceText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  orderButton: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  orderButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
};

export default Panier;
