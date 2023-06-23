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
  container: {
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
});
