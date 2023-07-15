import { AuthContext } from "../context/authContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';

function MesParametres() {
  const { isLoggedIn, accountId } = useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [accountInfo, setAccountInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const motDePasseRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const storedAccountInfo = localStorage.getItem("accountInfo");
    if (storedAccountInfo) {
      setAccountInfo(JSON.parse(storedAccountInfo));
      setLoading(false);
    } else {
      fetchAccountInfo();
    }
  }, []);

  const fetchAccountInfo = async () => {
    try {
      if (isLoggedIn) {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/compte.php",
          {
            accountId,
            isLoggedIn: isLoggedIn,
          }
        );
        if (response.data.status === "success") {
          setAccountInfo(response.data.accountInfo);
          localStorage.setItem(
            "accountInfo",
            JSON.stringify(response.data.accountInfo)
          );
        } else {
        }
      }
      setLoading(false);
    } catch (error) {
    }
  };

  const handleEditPassword = () => {
    setIsEditMode(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  const handleAddresses = () => {
    setIsEditMode(false);
    navigation.navigate("/userAdresses");
  };

  const handleSubmitPassword = async () => {
    const demande = {
      motDePasse: JSON.stringify(motDePasseRef.current.value),
    };

    if (getError(demande)) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      setPasswordError("Veuillez remplir tous les champs");
    } else {
      try {
        const response = await axios.post(
          "http://airneis.ddns.net:3000/edit-password.php",
          {
            accountId,
            isLoggedIn: isLoggedIn,
            oldPassword,
            newPassword,
          }
        );
        if (response.data.status === "success") {
          alert("Mot de passe modifié avec succès");
          setIsEditMode(false);
          setPasswordError("");
        } else {
          setPasswordError(response.data.message);
        }
      } catch (error) {
      }
    }
  };

  const handleChangeOldPassword = (value) => {
    setOldPassword(value);
  };

  const handleChangeNewPassword = (value) => {
    setNewPassword(value);
  };

  const handleChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  return (
    <>
      {isLoggedIn ? (
        <View style={styles.monCompteContainer}>
          <View style={styles.sidebarParam}>
            <Text style={styles.sidebarTitle}>
              Récapitulatif de votre compte
            </Text>
            <View style={styles.separator} />
            {isEditMode ? (
              <View onSubmit={handleSubmitPassword}>
                <View style={styles.formGroup}>
                  <Text style={styles.labelMdp}>Ancien mot de passe:</Text>
                  <View style={styles.passwordInput}>
                    <TextInput
                      ref={motDePasseRef}
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      value={oldPassword}
                      onChangeText={handleChangeOldPassword}
                      required
                    />
                    <TouchableOpacity
                      style={styles.passwordIcon}
                      onPress={toggleShowPassword}
                    >
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.labelMdp}>Nouveau mot de passe:</Text>
                  <View style={styles.passwordInput}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      ref={motDePasseRef}
                      value={newPassword}
                      onChangeText={handleChangeNewPassword}
                      required
                    />
                    <TouchableOpacity
                      style={styles.passwordIcon}
                      onPress={toggleShowPassword}
                    >
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.labelMdp}>
                    Répéter le nouveau mot de passe:
                  </Text>
                  <View style={styles.passwordInput}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      ref={motDePasseRef}
                      value={confirmPassword}
                      onChangeText={handleChangeConfirmPassword}
                      required
                    />
                    <TouchableOpacity
                      style={styles.passwordIcon}
                      onPress={toggleShowPassword}
                    >
                    </TouchableOpacity>
                  </View>
                </View>
                {passwordError && (
                  <Text style={styles.errorMessage}>{passwordError}</Text>
                )}
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.button} onPress={handleSubmitPassword}>
                    <Text style={styles.buttonText}>Valider ✔️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() => setIsEditMode(false)}>
                    <Text style={styles.buttonText}>Annuler ❌</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.formGroup}>
                  <Text style={styles.labelNom}>Nom:</Text>
                  <Text style={styles.formControl}>{accountInfo.nom}</Text>
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.labelEmail}>E-mail:</Text>
                  <Text style={styles.formControl}>{accountInfo.email}</Text>
                </View>
                <View style={styles.buttonGroup}>
                  <Text style={styles.labelMdp}>Mot de passe:</Text>
                  <Text style={styles.formControlPassword}>••••••••</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleEditPassword}
                  >
                    <Text style={styles.buttonText}>
                      Modifier le mot de passe
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.buttonGroup}>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('/moyen-de-paiement')}>
                    <Text style={styles.buttonText}>
                      Mes moyens de paiement
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleAddresses}>
                    <Text style={styles.buttonText}>Mes adresses</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      ) : (
        <>
          <Connexion previousLocation={route.params?.pathname} />
        </>
      )}
    </>
  );
}

export default MesParametres;

const styles = {
  monCompteContainer: {
    flex: 1,
    // Add your styles here
  },
  sidebarParam: {
    // Add your styles here
  },
  sidebarTitle: {
    // Add your styles here
  },
  separator: {
    // Add your styles here
  },
  formGroup: {
    // Add your styles here
  },
  labelMdp: {
    // Add your styles here
  },
  passwordInput: {
    // Add your styles here
  },
  input: {
    // Add your styles here
  },
  passwordIcon: {
    // Add your styles here
  },
  errorMessage: {
    // Add your styles here
  },
  buttonGroup: {
    // Add your styles here
  },
  button: {
    // Add your styles here
  },
  buttonText: {
    // Add your styles here
  },
  labelNom: {
    // Add your styles here
  },
  labelEmail: {
    // Add your styles here
  },
  formControl: {
    // Add your styles here
  },
  formControlPassword: {
    // Add your styles here
  },
};
