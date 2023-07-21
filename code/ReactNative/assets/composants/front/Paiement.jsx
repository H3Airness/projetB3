import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/InfoCommandeContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Connexion from "./Connexion";
import { styles } from "../../../Styles";

const Paiement = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const { panier, nombreProduits, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const { adresseLivraison, adresseFacturation, moyenPaiement } = useContext(InfoCommandeContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const totalPanierString = getTotalPanier().toString();
  const [disableButton, setDisableButton] = useState(false);

  const produitsCommande = Object.values(panier).map((produit) => ({
    idProduit: produit.id,
    nomProduit: produit.nom,
    prixProduit: produit.prix,
    quantiteProduit: produit.quantite,
  }));

  const handlePayer = async () => {
    if (selectedPaiementId) {
      const selectedPaiement = accountPaiement.find(
        (paiement) => paiement.id === selectedPaiementId
      );
  
      try {
        setDisableButton(true);
        const response = await axios.post('http://airneis.ddns.net:3000/commande.php', {
          accountId,
  
          nomAdresseLivraison: adresseLivraison.nomAdresseLivraison,
          nomLivraison: adresseLivraison.nomLivraison,
          prenomLivraison: adresseLivraison.prenomLivraison,
          adresseLivraison: adresseLivraison.adresseLivraison,
          adresseLivraison2: adresseLivraison.adresseLivraison2,
          codePostalLivraison: adresseLivraison.codePostalLivraison,
          villeLivraison: adresseLivraison.villeLivraison,
          paysLivraison: adresseLivraison.paysLivraison,
  
          nomFacturation: adresseFacturation.nomFacturation,
          prenomFacturation: adresseFacturation.prenomFacturation,
          adresseFacturation: adresseFacturation.adresseFacturation,
          codePostalFacturation: adresseFacturation.codePostalFacturation,
          villeFacturation: adresseFacturation.villeFacturation,
          paysFacturation: adresseFacturation.paysFacturation,
  
          nomPaiement: selectedPaiement.nom,
          numeroPaiement: selectedPaiement.numero,
          datePaiement: selectedPaiement.date,
          cvvPaiement: selectedPaiement.cvv,

          totalProduit: nombreProduits,
          totalPanier: totalPanierString,

          produitsCommande: produitsCommande,
        });
  
        if (response.data.status === 'success') {
          const { commandeId } = response.data;
  
          const Paiement = {
            nomPaiement: selectedPaiement.nom,
            numeroPaiement: selectedPaiement.numero,
            datePaiement: selectedPaiement.date,
            cvvPaiement: selectedPaiement.cvv,
            idCommande: commandeId,
          };
  
          moyenPaiement(Paiement);
          navigation.navigate("confirmationCommande");
        } else {
          setErrorMessage(response.data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setDisableButton(false);
      }
    } else {
      setErrorMessage("Veuillez renseigner ou sélectionner un moyen de paiement");
    }
  };

  const handleChangePaiement = (value) => {
    setSelectedPaiementId(value);
  };

  const [formDataPaiement, setFormDataPaiement] = useState({
    nom: "",
    numero: "",
    date: "",
    cvv: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(
          `http://airneis.ddns.net:3000/info_paiement.php?accountId=${accountId}`
        );
        if (accountRes.data.status === "success") {
          setAccountPaiement(accountRes.data.accountPaiement);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId, accountPaiement]);
  

  const handleInputChangePaiement = (name, value) => {
    setFormDataPaiement({ ...formDataPaiement, [name]: value });
  };

  const handleEditPaiement = (paiement) => {
    setEditModePaiement(true);
    setSelectedPaiementId(paiement.id);

    const selectedPaiement = accountPaiement.find((paiement) => paiement.id === selectedPaiementId);
  
    setFormDataPaiement({
      nom: selectedPaiement.nom,
      numero: selectedPaiement.numero,
      date: selectedPaiement.date,
      cvv: selectedPaiement.cvv,
    });
  };
  

  const handleAjoutPaiement = () => {
    setEditModePaiement(true);
    setSelectedPaiementId(null);

    setFormDataPaiement({
      nom: "",
      numero: "",
      date: "",
      cvv: "",
    });
  };

  const handleCancelPaiement = () => {
    setEditModePaiement(false);
  };

  const handleSubmitPaiement = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_paiement.php', {
        accountId,
        id: selectedPaiementId === "" ? null : selectedPaiementId,
        nom: formDataPaiement.nom,
        numero: formDataPaiement.numero,
        date: formDataPaiement.date,
        cvv: formDataPaiement.cvv,
      });
      if (response.data.status === 'success') {
        setEditModePaiement(false);
        const updatedAccountPaiement = accountPaiement.map((paiement) => {
          if (paiement.id === selectedPaiementId) {
            return {
              ...paiement,
              nom: formDataPaiement.nom,
              numero: formDataPaiement.numero,
              date: formDataPaiement.date,
              cvv: formDataPaiement.cvv,
            };
          }
          return paiement;
        });
        setAccountPaiement(updatedAccountPaiement);
        setSuccessMessagePaiement('Les informations de paiement ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessagePaiement(null);
        }, 2000);
        window.location.href = "/Paiement";
      }
    } catch (error) {}
  };

  const handleDeletePaiement = async (paiement) => {
  try {
    await axios.delete(
      `http://airneis.ddns.net:3000/delete_info_paiement.php?id=${paiement.id}`
    );
    const updatedAccountPaiement = accountPaiement.filter(
      (item) => item.id !== paiement.id
    );
    setAccountPaiement(updatedAccountPaiement);
    setSelectedPaiementId("");
  } catch (error) {}
};


  if (loading) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <>
    <ScrollView>
      {isLoggedIn ? (
        <>
          <View style={styles.containerCgu}>
            <View style={styles.sidebarParam}>
              <Text style={styles.titleCgu}>
              Moyen de Paiement
              </Text>
              <View>
                <Text>
                  {successMessagePaiement && (
                    <View style={styles.successAlert}>
                      <Text>{successMessagePaiement}</Text>
                    </View>
                  )}
                </Text>

                {editModePaiement && (
                  <View style={styles.priceContainer}>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Nom sur la carte: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Nom sur la carte"
                        value={formDataPaiement.nom}
                        onChangeText={(value) =>
                          handleInputChangePaiement("nom", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Numéro carte: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Numéro de carte"
                        value={formDataPaiement.numero}
                        onChangeText={(value) =>
                          handleInputChangePaiement("numero", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>Date d'expiration: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Date d'expiration (MM/YY)"
                        value={formDataPaiement.date}
                        onChangeText={(value) =>
                          handleInputChangePaiement("date", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.formGroup}>
                      <Text style={styles.label}>CVV: </Text>
                      <TextInput
                        style={styles.input}
                        placeholder="CVV"
                        value={formDataPaiement.cvv}
                        onChangeText={(value) =>
                          handleInputChangePaiement("cvv", value)
                        }
                        required
                      />
                    </View>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        onPress={handleSubmitPaiement}
                        style={styles.ajouterButton}
                      >
                        <Text style={styles.ajouterButtonText}>Enregistrer 💾</Text>
                      </TouchableOpacity>
                      <View style={styles.dividerbtn}/>
                      <TouchableOpacity
                        onPress={handleCancelPaiement}
                        style={styles.ajouterButton}
                      >
                        <Text style={styles.ajouterButtonText}>Annuler ❌</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {!editModePaiement && (
                  <View style={styles.priceContainer}>
                    <View>
                    {accountPaiement.length > 0 ? (
                      <View>
                      <Picker
                        style={[styles.picker, { backgroundColor: '#f0f0f0' }]}
                        selectedValue={selectedPaiementId}
                        onValueChange={(itemValue) => setSelectedPaiementId(itemValue)}
                      >
                        <Picker.Item label="Sélectionner une adresse" value="" />
                        {accountPaiement.map((paiement) => (
                          <Picker.Item key={paiement.id} label={paiement.nom} value={paiement.id} />
                        ))}
                      </Picker>
                      <View style={styles.dividerbtn}/>
                      {selectedPaiementId !== "" && (
                        <View style={styles.adresseContainer}>
                          <Text>Nom sur la carte: <Text style={styles.boldText}>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).nom}</Text></Text>
                          <Text>Numéro carte: <Text style={styles.boldText}>{"**** **** **** " +accountPaiement.find((paiement) => paiement.id === selectedPaiementId).numero.slice(-4)}</Text></Text>
                          <Text>Date d'expiration: <Text style={styles.boldText}>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).date}</Text></Text>
                          <Text>CVV: <Text style={styles.boldText}>***</Text></Text>
                          <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.ajouterButton} onPress={handleEditPaiement}>
                              <Text style={styles.ajouterButtonText}>Modifier ⚙️</Text>
                            </TouchableOpacity>
                            <View style={styles.dividerbtn}/>
                            <TouchableOpacity style={styles.ajouterButton} onPress={handleDeletePaiement}>
                              <Text style={styles.ajouterButtonText}>Supprimer ❌</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                    ) : (
                      <View>
                        <Text>Aucun moyen de paiement enregistré</Text>
                      </View>
                    )}
                    </View>
                    <TouchableOpacity
                      onPress={handleAjoutPaiement}
                      style={styles.btn}
                    >
                      <Text style={styles.ajouterButtonText}>
                        Ajouter un moyen de paiement ➕
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.buttonGroup} />

                {errorMessage && (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                )}
                <View style={styles.buttonGroup} />
                <View style={styles.containerBtn}>
                  <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnRetour}>
                    <Text style={styles.ajouterButtonText}>Retour</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePayer} style={styles.btn} disabled={disableButton}>
                    <Text style={styles.ajouterButtonText}>Confirmer ma commande</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : (
        <Connexion />
      )}
      </ScrollView>
    </>
  );
};

export default Paiement;
