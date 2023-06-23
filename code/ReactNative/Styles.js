import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  titreContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  titreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerCategorie: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  produitContainer: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  produitImage: {
    width: '100%',
    height: 200,
  },
  produitInfo: {
    padding: 10,
  },
  produitTitre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  produitPrix: {
    fontSize: 14,
    marginBottom: 5,
  },
  ajouterButtonContainer: {
    marginTop: 10,
  },
  ajouterButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  ajouterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stockEpuiseButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  stockEpuiseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  containerCgu: {
    flex: 1,
    padding: 20,
  },
  titleCgu: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  titleCgu2: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
  },

  headingContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
  },

  containerRecherche: {
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
  inputRecherche: {
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
  buttonTextRecherche: {
    color: '#FFF',
  },

  headingPanier: {
    marginBottom: 10,
    textAlign: 'center',
  },
  containerPanier: {
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

  contactTitre: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  catContact: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  contactLog: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  iconContact: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactCard: {
    flex: 1,
    marginLeft: 20,
  },
  cardHeader: {
    backgroundColor: '#eaeaea',
    padding: 10,
  },
  formGroup: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  textarea: {
    height: 100,
  },
  buttonText: {
    textAlign: 'center',
    backgroundColor: 'blue',
    color: '#fff',
    padding: 10,
  },
  reponseFormulaire: {
    textAlign: 'center',
    marginTop: 10,
  },
});
