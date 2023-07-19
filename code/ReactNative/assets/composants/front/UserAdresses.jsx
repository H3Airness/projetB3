import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/authContext";
import Connexion from "./Connexion";
import { styles } from '../../../Styles';

const UserAdresses = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState([]);
  const [accountFac, setAccountFac] = useState({});
  const [editModeLivraison, setEditModeLivraison] = useState(false);
  const [successMessageLivraison, setSuccessMessageLivraison] = useState(null);
  const [successMessageFacturation, setSuccessMessageFacturation] = useState(null);
  const [selectedAdresseId, setSelectedAdresseId] = useState(""); 

  const [formDataLivraison, setFormDataLivraison] = useState({
    nomAdresse: '',
    nom: '',
    prenom: '',
    adresseLivraison: '',
    adresseLivraison2: '',
    codePostalLivraison: '',
    villeLivraison: '',
    pays: '',
  });
  const [editModeFacturation, setEditModeFacturation] = useState(false);
  const [formDataFacturation, setFormDataFacturation] = useState({
    nomFacturation:'',
    prenomFacturation:'',
    adresseFacturation: '',
    codePostalFacturation: '',
    villeFacturation: '',
    paysFacturation: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountInfo(accountRes.data.accountLivraisons);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_facturation.php?accountId=${accountId}`);
        if (accountRes.data.status === 'success') {
          setAccountFac(accountRes.data.accountLivraison);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [accountId]);

  const handleInputChangeLivraison = (name, value) => {
    setFormDataLivraison({ ...formDataLivraison, [name]: value });
  };

  const handleInputChangeFacturation = (name, value) => {
    setFormDataFacturation({ ...formDataFacturation, [name]: value });
  };

  const handleEditLivraison = () => {
    setEditModeLivraison(true);
    setEditModeFacturation(false);
  
    const selectedAdresse = accountInfo.find((adresse) => adresse.id === selectedAdresseId);
  
    setFormDataLivraison({
      nomAdresse: selectedAdresse.nom_adresse,
      nom: selectedAdresse.nom,
      prenom: selectedAdresse.prenom,
      adresseLivraison: selectedAdresse.adresse1,
      adresseLivraison2: selectedAdresse.adresse2,
      codePostalLivraison: selectedAdresse.code_postal,
      villeLivraison: selectedAdresse.ville,
      pays: selectedAdresse.pays,
    });
  
    setFormDataFacturation({
      nomFacturation: '',
      prenomFacturation: '',
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };

  const handleAjoutLivraison = () => {
    setEditModeLivraison(true);
    setEditModeFacturation(false);
    setSelectedAdresseId("");
  
    const selectedAdresse = accountInfo.find((adresse) => adresse.id === selectedAdresseId);
  
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
    });
  
    setFormDataFacturation({
      nomFacturation: '',
      prenomFacturation: '',
      adresseFacturation: '',
      codePostalFacturation: '',
      villeFacturation: '',
      paysFacturation: '',
    });
  };
  
  const handleEditFacturation = () => {
    setEditModeFacturation(true);
    setEditModeLivraison(false);
  
    setFormDataLivraison({
      nomAdresse: '',
      nom: '',
      prenom: '',
      adresseLivraison: '',
      adresseLivraison2: '',
      codePostalLivraison: '',
      villeLivraison: '',
      pays: '',
    });
  
    setFormDataFacturation({
      nomFacturation: accountFac.nom_facturation,
      prenomFacturation: accountFac.prenom_facturation,
      adresseFacturation: accountFac.adresse_facturation,
      codePostalFacturation: accountFac.code_postal_facturation,
      villeFacturation: accountFac.ville_facturation,
      paysFacturation: accountFac.pays_facturation,
    });
  };

  const handleCancelLivraison = () => {
    setEditModeLivraison(false);
  };

  const handleCancelFacturation = () => {
    setEditModeFacturation(false);
  };

  const handleSubmitLivraison = async () => {
    
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_livraison.php', {
        accountId,
        id: selectedAdresseId === "" ? null : selectedAdresseId,
        nomAdresse: formDataLivraison.nomAdresse,
        nom: formDataLivraison.nom,
        prenom: formDataLivraison.prenom,
        adresseLivraison: formDataLivraison.adresseLivraison,
        adresseLivraison2: formDataLivraison.adresseLivraison2,
        codePostalLivraison: formDataLivraison.codePostalLivraison,
        villeLivraison: formDataLivraison.villeLivraison,
        pays: formDataLivraison.pays,
      });
      if (response.data.status === 'success') {
        setEditModeLivraison(false);
        const updatedAccountInfo = accountInfo.map((adresse) => {
          if (adresse.id === selectedAdresseId) {
            return {
              ...adresse,
              nom_adresse: formDataLivraison.nomAdresse,
              nom: formDataLivraison.nom,
              prenom: formDataLivraison.prenom,
              adresse1: formDataLivraison.adresseLivraison,
              adresse2: formDataLivraison.adresseLivraison2,
              code_postal: formDataLivraison.codePostalLivraison,
              ville: formDataLivraison.villeLivraison,
              pays: formDataLivraison.pays,
            };
          }
          return adresse;
        });
        setAccountInfo(updatedAccountInfo);
        setSuccessMessageLivraison('Les informations de livraison ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageLivraison(null);
        }, 2000);
        navigation.navigate("adresse");

      } else {
      }
    } catch (error) {
    }
  };

  const handleSubmitFacturation = async () => {
    
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        nomFacturation: formDataFacturation.nomFacturation,
        prenomFacturation: formDataFacturation.prenomFacturation,
        adresseFacturation: formDataFacturation.adresseFacturation,
        codePostalFacturation: formDataFacturation.codePostalFacturation,
        villeFacturation: formDataFacturation.villeFacturation,
        paysFacturation: formDataFacturation.paysFacturation,
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountFac({
          ...accountFac,
          nom_facturation: formDataFacturation.nomFacturation,
          prenom_facturation: formDataFacturation.prenomFacturation,
          adresse_facturation: formDataFacturation.adresseFacturation,
          code_postal_facturation: formDataFacturation.codePostalFacturation,
          ville_facturation: formDataFacturation.villeFacturation,
          pays_facturation: formDataFacturation.paysFacturation,
        });
        setSuccessMessageFacturation('Les informations de facturation ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageFacturation(null);
        }, 2000);
      } else {
      }
    } catch (error) {
    }
  };

  const handleDeleteFacturation = async () => {
    try {
      const response = await axios.post('http://airneis.ddns.net:3000/update_info_facturation.php', {
        accountId,
        nomFacturation: '',
        prenomFacturation: '',
        adresseFacturation: '',
        codePostalFacturation: null,
        villeFacturation: '',
        paysFacturation: '',
      });
      if (response.data.status === 'success') {
        setEditModeFacturation(false);
        setAccountFac({
          ...accountFac,
          nom_facturation: formDataFacturation.nomFacturation,
          prenom_facturation: formDataFacturation.prenomFacturation,
          adresse_facturation: formDataFacturation.adresseFacturation,
          code_postal_facturation: formDataFacturation.codePostalFacturation,
          ville_facturation: formDataFacturation.villeFacturation,
          pays_facturation: formDataFacturation.paysFacturation,
        });
        setSuccessMessageFacturation('Les informations de facturation ont été mises à jour avec succès.');
        setTimeout(() => {
          setSuccessMessageFacturation(null);
        }, 2000);
      } else {
      }
    } catch (error) {
    }
  };

  const handleDeleteAdresse = async () => {
    try {
      await axios.delete(`http://airneis.ddns.net:3000/delete_info_livraison.php?id=${selectedAdresseId}`);
      navigation.navigate("adresse");
      setSelectedAdresseId("");
    } catch (error) {
    }
  };
  

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <>
      {isLoggedIn ? (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>Récapitulatif de votre compte</Text>
            <View>
              <Text style={styles.sectionTitle}>Carnet d'adresses</Text>
              {successMessageLivraison && <Text style={styles.successMessage}>{successMessageLivraison}</Text>}
              {successMessageFacturation && <Text style={styles.successMessage}>{successMessageFacturation}</Text>}
              {editModeLivraison && (
                <View>
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.nomAdresse}
                        onChangeText={(value) => handleInputChangeLivraison("nomAdresse", value)}
                        placeholder="Nom de l'adresse"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.nom}
                        onChangeText={(value) => handleInputChangeLivraison("nom", value)}
                        placeholder="Nom"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.prenom}
                        onChangeText={(value) => handleInputChangeLivraison("prenom", value)}
                        placeholder="Prénom"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.adresseLivraison}
                        onChangeText={(value) => handleInputChangeLivraison("adresseLivraison", value)}
                        placeholder="Adresse"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.adresseLivraison2}
                        onChangeText={(value) => handleInputChangeLivraison("adresseLivraison2", value)}
                        placeholder="Adresse 2 (optionnel)"
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.codePostalLivraison}
                        onChangeText={(value) => handleInputChangeLivraison("codePostalLivraison", value)}
                        placeholder="Code postal"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.villeLivraison}
                        onChangeText={(value) => handleInputChangeLivraison("villeLivraison", value)}
                        placeholder="Ville"
                        required
                    />
                    <TextInput
                        style={styles.input}
                        value={formDataLivraison.pays}
                        onChangeText={(value) => handleInputChangeLivraison("pays", value)}
                        placeholder="Pays"
                        required
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleSubmitLivraison}>
                        <Text style={styles.buttonText}>Enregistrer 💾</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleCancelLivraison}>
                        <Text style={styles.buttonText}>Annuler ❌</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              )}
            </View>
            {editModeFacturation && (
            <View>
              <Text style={styles.sectionTitle}>Adresse de facturation</Text>
              <TextInput
                style={styles.input}
                value={formDataFacturation.nomFacturation}
                onChangeText={(value) => handleInputChangeFacturation("nomFacturation", value)}
                placeholder="Nom"
                required
              />
              <TextInput
                style={styles.input}
                value={formDataFacturation.prenomFacturation}
                onChangeText={(value) => handleInputChangeFacturation("prenomFacturation", value)}
                placeholder="Prénom"
                required
              />
              <TextInput
                style={styles.input}
                value={formDataFacturation.adresseFacturation}
                onChangeText={(value) => handleInputChangeFacturation("adresseFacturation", value)}
                placeholder="Adresse"
                required
              />
              <TextInput
                style={styles.input}
                value={formDataFacturation.codePostalFacturation}
                onChangeText={(value) => handleInputChangeFacturation("codePostalFacturation", value)}
                placeholder="Code postal"
                required
              />
              <TextInput
                style={styles.input}
                value={formDataFacturation.villeFacturation}
                onChangeText={(value) => handleInputChangeFacturation("villeFacturation", value)}
                placeholder="Ville"
                required
              />
              <TextInput
                style={styles.input}
                value={formDataFacturation.paysFacturation}
                onChangeText={(value) => handleInputChangeFacturation("paysFacturation", value)}
                placeholder="Pays"
                required
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSubmitFacturation}>
                  <Text style={styles.buttonText}>Enregistrer 💾</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCancelFacturation}>
                  <Text style={styles.buttonText}>Annuler ❌</Text>
                </TouchableOpacity>
              </View>
            </View>
            )}
            {!editModeLivraison && !editModeFacturation && (
              <View>
                <View>
                  <Text style={styles.sectionTitle}>Adresse de livraison</Text>
                  {accountInfo.length > 0 ? (
                    <View>
                      <Picker
                        selectedValue={selectedAdresseId}
                        onValueChange={(itemValue) => setSelectedAdresseId(itemValue)}
                      >
                        <Picker.Item label="Sélectionner une adresse" value="" />
                        {accountInfo.map((adresse) => (
                          <Picker.Item key={adresse.id} label={adresse.nom_adresse} value={adresse.id} />
                        ))}
                      </Picker>
                      {selectedAdresseId !== "" && (
                        <View style={styles.adresseContainer}>
                          <Text>Nom de l'adresse: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom_adresse}</Text></Text>
                          <Text>Nom: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).nom}</Text></Text>
                          <Text>Prénom: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).prenom}</Text></Text>
                          <Text>Adresse: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse1}</Text></Text>
                          <Text>Adresse 2: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).adresse2}</Text></Text>
                          <Text>Code postal: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).code_postal}</Text></Text>
                          <Text>Ville: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).ville}</Text></Text>
                          <Text>Pays: <Text style={styles.bold}>{accountInfo.find((adresse) => adresse.id === selectedAdresseId).pays}</Text></Text>
                          <View style={styles.centeredButtonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleEditLivraison}>
                              <Text style={styles.buttonText}>Modifier ⚙️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleDeleteAdresse}>
                              <Text style={styles.buttonText}>Supprimer ⛒</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View>
                      <Text>Aucune adresse de livraison enregistrée</Text>
                    </View>
                  )}
                </View>
                <View style={styles.centeredButtonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handleAjoutLivraison}>
                    <Text style={styles.buttonText}>Ajouter une adresse ➕</Text>
                  </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.sectionTitle}>Adresse de facturation</Text>
                    {accountFac.nom_facturation || accountFac.prenom_facturation || accountFac.pays_facturation || accountFac.adresse_facturation || accountFac.code_postal_facturation || accountFac.ville_facturation ? (
                        <View>
                        <Text>Nom: <Text style={styles.boldText}>{accountFac.nom_facturation}</Text></Text>
                        <Text>Prénom: <Text style={styles.boldText}>{accountFac.prenom_facturation}</Text></Text>
                        <Text>Adresse: <Text style={styles.boldText}>{accountFac.adresse_facturation}</Text></Text>
                        <Text>Code postal: <Text style={styles.boldText}>{accountFac.code_postal_facturation}</Text></Text>
                        <Text>Ville: <Text style={styles.boldText}>{accountFac.ville_facturation}</Text></Text>
                        <Text>Pays: <Text style={styles.boldText}>{accountFac.pays_facturation}</Text></Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleEditFacturation} style={styles.button}>
                            <Text style={styles.buttonText}>Modifier ⚙️</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDeleteFacturation} style={styles.button}>
                            <Text style={styles.buttonText}>Supprimer ⛒</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    ) : (
                        <View>
                        <Text>Aucune adresse de facturation enregistrée.</Text>
                        <TouchableOpacity onPress={handleEditFacturation} style={styles.addButton}>
                            <Text style={styles.buttonText}>Ajouter une adresse de facturation</Text>
                        </TouchableOpacity>
                        </View>
                    )}
                    </View>

              </View>
            )}
          </ScrollView>
        </View>
      ) : (
        <Connexion />
      )}
    </>
  );
};

export default UserAdresses;
