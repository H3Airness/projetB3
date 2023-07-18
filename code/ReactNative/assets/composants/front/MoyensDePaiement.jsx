import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity  } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Connexion from "./Connexion";
import { styles } from '../../../Styles';

const MoyenDePaiement = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountPaiement, setAccountPaiement] = useState([]);
  const [successMessagePaiement, setSuccessMessagePaiement] = useState(null);
  const [selectedPaiementId, setSelectedPaiementId] = useState("");
  const [editModePaiement, setEditModePaiement] = useState(false);

  const nomPaiementRef = useRef();
  const numeroPaiementRef = useRef();
  const datePaiementRef = useRef();
  const cvvPaiementRef = useRef();

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
        const accountRes = await axios.get(`http://airneis.ddns.net:3000/info_paiement.php?accountId=${accountId}`);
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
  }, [accountId]);

  const handleInputChangePaiement = (name, value) => {
    setFormDataPaiement({ ...formDataPaiement, [name]: value });
  };

  const handleEditPaiement = () => {
    setEditModePaiement(true);

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
    setSelectedPaiementId("");

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

  const handleSubmitPaiement = async () => {
    try {
      const response = await axios.post("http://airneis.ddns.net:3000/update_info_paiement.php", {
        accountId,
        id: selectedPaiementId === "" ? null : selectedPaiementId,
        nom: formDataPaiement.nom,
        numero: formDataPaiement.numero,
        date: formDataPaiement.date,
        cvv: formDataPaiement.cvv,
      });
      if (response.data.status === "success") {
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
        setSuccessMessagePaiement("Les informations de paiement ont été mises à jour avec succès.");
        setTimeout(() => {
          setSuccessMessagePaiement(null);
        }, 2000);
        window.location.reload();
      } else {
      }
    } catch (error) {
    }
  };

  const handleDeletePaiement = async () => {
    try {
      await axios.delete(`http://airneis.ddns.net:3000/delete_info_livraison.php?id=${selectedPaiementId}`);
      const updatedAccountPaiement = accountPaiement.filter((paiement) => paiement.id !== selectedPaiementId);
      setAccountPaiement(updatedAccountPaiement);
      setSelectedPaiementId("");
    } catch (error) {
    }
  };

  console.log(accountPaiement)

  if (loading) {
    return <View><Text>Chargement...</Text></View>;
  }

  return (
    <>
      {isLoggedIn ? (
        <>
          <View style={styles.monCompteContainer}>
            <View style={styles.sidebarParam}>
              <Text style={styles.sidebarTitle}>Récapitulatif de votre compte</Text>
              <View>
                <Text style={styles.headingText}>Moyen de Paiement</Text>
                {successMessagePaiement && <View style={styles.successAlert}>{successMessagePaiement}</View>}
                <View style={styles.divider} />
                {editModePaiement && (
                  <View>
                    <TextInput
                      ref={nomPaiementRef}
                      style={styles.input}
                      placeholder="Nom sur la carte"
                      value={formDataPaiement.nom}
                      onChangeText={(value) => handleInputChangePaiement("nom", value)}
                      required
                    />
                    <TextInput
                      ref={numeroPaiementRef}
                      style={styles.input}
                      placeholder="Numéro de carte"
                      value={formDataPaiement.numero}
                      onChangeText={(value) => handleInputChangePaiement("numero", value)}
                      required
                    />
                    <TextInput
                      ref={datePaiementRef}
                      style={styles.input}
                      placeholder="Date d'expiration (MM/YY)"
                      value={formDataPaiement.date}
                      onChangeText={(value) => handleInputChangePaiement("date", value)}
                      required
                    />
                    <TextInput
                      ref={cvvPaiementRef}
                      style={styles.input}
                      placeholder="CVV"
                      value={formDataPaiement.cvv}
                      onChangeText={(value) => handleInputChangePaiement("cvv", value)}
                      required
                    />
                    <TouchableOpacity onPress={handleSubmitPaiement} style={styles.customButton}>
                      <Text style={styles.buttonText}>Enregistrer 💾</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleCancelPaiement} style={styles.customButton}>
                      <Text style={styles.buttonText}>Annuler ❌</Text>
                    </TouchableOpacity>
                  </View>
                )}

                {!editModePaiement && (
                  <View>
                    <View>
                      {accountPaiement.length > 0 ? (
                        <View style={styles.selectContainer}>
                          <DropDownPicker
                            items={accountPaiement.map((paiement) => ({
                              label: paiement.nom,
                              value: paiement.id,
                            }))}
                            defaultValue={selectedPaiementId}
                            containerStyle={{ height: 60, width: 200 }}
                            onChangeItem={(item) => handleChangePaiement(item.value)}
                            style={styles.select}
                          />

                          <View style={styles.container}>
                                <Picker
                                  selectedValue={selectedPaiementId}
                                  style={{ height: 50, width: 150 }}
                                  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                  <Picker.Item label="Java" value="java" />
                                  <Picker.Item label="JavaScript" value="js" />
                                </Picker>
                              </View>

                          {selectedPaiementId !== "" && (
                            <View>
                              <Text>Nom sur la carte: <Text style={styles.boldText}>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).nom}</Text></Text>
                              <Text>Numéro de carte: <Text style={styles.boldText}>{"**** **** **** " + accountPaiement.find((paiement) => paiement.id === selectedPaiementId).numero.slice(-4)}</Text></Text>
                              <Text>Date d'expiration: <Text style={styles.boldText}>{accountPaiement.find((paiement) => paiement.id === selectedPaiementId).date}</Text></Text>
                              <Text>CVV: <Text style={styles.boldText}>{"***"}</Text></Text>
                              <TouchableOpacity onPress={handleEditPaiement} style={styles.customButton}>
                                <Text style={styles.buttonText}>Modifier ⚙️</Text>
                              </TouchableOpacity>
                              <TouchableOpacity onPress={handleDeletePaiement} style={styles.customButton}>
                                <Text style={styles.buttonText}>Supprimer ⛒</Text>
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
                      ) : (
                        <View>
                          <Text>Aucun moyen de paiement enregistré</Text>
                        </View>
                      )}
                    </View>
                    <TouchableOpacity onPress={handleAjoutPaiement} style={styles.customButton}>
                      <Text style={styles.buttonText}>Ajouter un moyen de paiement</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={styles.divider} />
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.customButton}>
                  <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : (
        <Connexion />
      )}
    </>
  );
};

export default MoyenDePaiement;
