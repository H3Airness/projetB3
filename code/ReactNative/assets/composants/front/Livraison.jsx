import React, { useState, useContext, useEffect, useRef } from "react";
import { dataContext } from "../context/dataContext";
import { AuthContext } from "../context/authContext";
import { InfoCommandeContext } from "../context/InfoCommandeContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Connexion from "./Connexion";
import { View, Text, Button, TextInput } from "react-native";

const Livraison = () => {
  const { panier, getTotalPanier, getTotalProduit } = useContext(dataContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedAdresseId, setSelectedAdresseId] = useState("");
  const { adresseLivraisonSelectionner, adresseLivraisonFacturation } = useContext(
    InfoCommandeContext
  );

  const nomAdresseLivraisonRef = useRef();
  const nomLivraisonRef = useRef();
  const prenomLivraisonRef = useRef();
  const adresseLivraisonRef = useRef();
  const adresse2LivraisonRef = useRef();
  const codePostalLivraisonRef = useRef();
  const villeLivraisonRef = useRef();
  const paysLivraisonRef = useRef();

  const nomFacturationRef = useRef();
  const prenomFacturationRef = useRef();
  const adresseFacturationRef = useRef();
  const codePostalFacturationRef = useRef();
  const villeFacturationRef = useRef();
  const paysFacturationRef = useRef();

 
  const handleChangeAdresse = (value) => {
    setSelectedAdresseId(value);
  };

  const handlePayer = () => {
    if (
      selectedAdresseId &&
      (accountFac.nom_facturation ||
        accountFac.prenom_facturation ||
        accountFac.pays_facturation ||
        accountFac.adresse_facturation ||
        accountFac.code_postal_facturation ||
        accountFac.ville_facturation)
    ) {
      const selectedAdresse = accountInfo.find(
        (adresse) => adresse.id === selectedAdresseId
      );

      const adresseLivraison = {
        nomAdresseLivraison: selectedAdresse.nom_adresse,
        nomLivraison: selectedAdresse.nom,
        prenomLivraison: selectedAdresse.prenom,
        adresseLivraison: selectedAdresse.adresse1,
        adresseLivraison2: selectedAdresse.adresse2,
        codePostalLivraison: selectedAdresse.code_postal,
        villeLivraison: selectedAdresse.ville,
        paysLivraison: selectedAdresse.pays,
      };

      const adresseFacturation = {
        nomFacturation: accountFac.nom_facturation,
        prenomFacturation: accountFac.prenom_facturation,
        adresseFacturation: accountFac.adresse_facturation,
        codePostalFacturation: accountFac.code_postal_facturation,
        villeFacturation: accountFac.ville_facturation,
        paysFacturation: accountFac.pays_facturation,
      };

      adresseLivraisonSelectionner(adresseLivraison);
      adresseLivraisonFacturation(adresseFacturation);
      navigation.navigate("Paiement");
    } else {
      setErrorMessage(
        "Veuillez renseigner une adresse de livraison et une adresse de facturation"
      );
    }
  };

  const [loading, setLoading] = useState(true);
  const { accountId, isLoggedIn } = useContext(AuthContext);
  const [accountInfo, setAccountInfo] = useState([]);
  const [accountFac, setAccountFac] = useState({});
  const [adresseExistante, setAdresseExistante] = useState(false);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await axios.get(`/api/account/${accountId}`);
        setAccountInfo(response.data.adresses);
        setAccountFac(response.data.fac);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (isLoggedIn) {
      fetchAccountInfo();
    } else {
      setLoading(false);
    }
  }, [accountId, isLoggedIn]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!isLoggedIn) {
    return <Connexion />;
  }

  return (
    <View>
      <Text>Page de Livraison</Text>
      <AlertComponent alerte={alerte} alerte2={alerte2} />

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <Text>Adresse de livraison</Text>
      <View>
        <Text>Adresse existante :</Text>
        <Picker
          selectedValue={selectedAdresseId}
          onValueChange={(itemValue) => handleChangeAdresse(itemValue)}
        >
          <Picker.Item label="Choisir une adresse" value="" />
          {accountInfo.map((adresse) => (
            <Picker.Item
              key={adresse.id}
              label={adresse.nom_adresse}
              value={adresse.id}
            />
          ))}
        </Picker>
      </View>

      <Text>Nouvelle adresse :</Text>
      <TextInput
        ref={nomAdresseLivraisonRef}
        placeholder="Nom adresse"
        onFocus={handleFocus}
      />
      <TextInput
        ref={nomLivraisonRef}
        placeholder="Nom"
        onFocus={handleFocus}
      />
      <TextInput
        ref={prenomLivraisonRef}
        placeholder="Prénom"
        onFocus={handleFocus}
      />
      <TextInput
        ref={adresseLivraisonRef}
        placeholder="Adresse"
        onFocus={handleFocus}
      />
      <TextInput
        ref={adresse2LivraisonRef}
        placeholder="Adresse 2"
        onFocus={handleFocus}
      />
      <TextInput
        ref={codePostalLivraisonRef}
        placeholder="Code postal"
        onFocus={handleFocus}
      />
      <TextInput
        ref={villeLivraisonRef}
        placeholder="Ville"
        onFocus={handleFocus}
      />
      <TextInput
        ref={paysLivraisonRef}
        placeholder="Pays"
        onFocus={handleFocus}
      />

      <Text>Adresse de facturation :</Text>
      <TextInput
        ref={nomFacturationRef}
        placeholder="Nom"
        onFocus={handleFocus2}
      />
      <TextInput
        ref={prenomFacturationRef}
        placeholder="Prénom"
        onFocus={handleFocus2}
      />
      <TextInput
        ref={adresseFacturationRef}
        placeholder="Adresse"
        onFocus={handleFocus2}
      />
      <TextInput
        ref={codePostalFacturationRef}
        placeholder="Code postal"
        onFocus={handleFocus2}
      />
      <TextInput
        ref={villeFacturationRef}
        placeholder="Ville"
        onFocus={handleFocus2}
      />
      <TextInput
        ref={paysFacturationRef}
        placeholder="Pays"
        onFocus={handleFocus2}
      />

      <Button title="Payer" onPress={handlePayer} />
    </View>
  );
};

export default Livraison;

