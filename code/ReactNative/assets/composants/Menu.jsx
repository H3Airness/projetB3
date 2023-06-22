import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dataContext } from "./context/dataContext";

const Menu = () => {
  const { nombreProduits } = useContext(dataContext);
  const navigation = useNavigation();

  return (
    <View style={{ backgroundColor: "grey"}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Accueil")}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={{ uri: "http://airneis.ddns.net:3000/img/logo.svg" }}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>Àirneis</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Recherche")}
            style={{ marginRight: 10 }}
          >
            <Image
              source={{ uri: "http://airneis.ddns.net:3000/img/icon_recherche.png" }}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={{ position: "relative" }}
          >
            <Image
              source={{ uri: "http://airneis.ddns.net:3000/img/icon_panier.png" }}
              style={{ width: 20, height: 20 }}
            />
            {nombreProduits > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>{nombreProduits}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Menu;
