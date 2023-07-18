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
        const response = await axios.get(`http://airneis.ddns.net:3000/info_livraison.php?accountId=${accountId}`);
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

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <Text>Adresse de livraison</Text>
      <View>
        <Text>Adresse existante :</Text>
      </View>

      <Text>Nouvelle adresse :</Text>
      <TextInput
        ref={nomAdresseLivraisonRef}
        placeholder="Nom adresse"
      />
      <TextInput
        ref={nomLivraisonRef}
        placeholder="Nom"
      />
      <TextInput
        ref={prenomLivraisonRef}
        placeholder="Prénom"
      />
      <TextInput
        ref={adresseLivraisonRef}
        placeholder="Adresse"
      />
      <TextInput
        ref={adresse2LivraisonRef}
        placeholder="Adresse 2"
      />
      <TextInput
        ref={codePostalLivraisonRef}
        placeholder="Code postal"
      />
      <TextInput
        ref={villeLivraisonRef}
        placeholder="Ville"
      />
      <TextInput
        ref={paysLivraisonRef}
        placeholder="Pays"
      />

      <Text>Adresse de facturation :</Text>
      <TextInput
        ref={nomFacturationRef}
        placeholder="Nom"
      />
      <TextInput
        ref={prenomFacturationRef}
        placeholder="Prénom"
      />
      <TextInput
        ref={adresseFacturationRef}
        placeholder="Adresse"
      />
      <TextInput
        ref={codePostalFacturationRef}
        placeholder="Code postal"
      />
      <TextInput
        ref={villeFacturationRef}
        placeholder="Ville"
      />
      <TextInput
        ref={paysFacturationRef}
        placeholder="Pays"
      />

      <Button title="Payer" onPress={handlePayer} />
    </View>
  );
};

export default Livraison;

