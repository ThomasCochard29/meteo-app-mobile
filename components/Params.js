import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { theme } from "../theme";

// Firebase
import firebase from "../firebase";

// Icon
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

export default function Params({
  showSearch,
  toggleSearch,
  searchText,
  handleSearch,
  handleLocationHistory,
}) {
  const [searchHistory, setSearchHistory] = useState([]);

  // Fonction pour récupérer les données depuis Firestore
  const retrieveData = async () => {
    try {
      const db = firebase.firestore();
      const searchHistoryRef = db.collection("search");

      // Utilisez orderBy pour trier par ordre décroissant selon le champ timestamp
      const querySnapshot = await searchHistoryRef
        .orderBy("timestamp", "desc")
        .get();

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });

      setSearchHistory(data);
    } catch (error) {
      console.error("Error retrieving documents: ", error);
    }
  };

  useEffect(() => {
    // Appel de la fonction pour récupérer les données
    retrieveData();
  }, []);

  console.log(searchHistory);

  return (
    <View className="mx-4 absolute top-7 right-0 z-50">
      <View className="flex-row justify-end items-center rounded-full">
        {showSearch ? (
          <TextInput
            placeholder="Search City"
            placeholderTextColor={"lightgray"}
            value={searchText}
            onChangeText={handleSearch}
            className="pl-6 h-10 flex-1 text-base text-white"
          />
        ) : null}

        <TouchableOpacity
          onPress={() => toggleSearch(!showSearch)}
          style={{ backgroundColor: theme.bgWhite(0.2) }}
          className="rounded-full p-3 m-1"
        >
          <MagnifyingGlassIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* Affichez les données récupérées ici */}
      {searchHistory.length > 0 ? (
        <View
          className="absolute top-16 right-0 rounded-3xl"
          style={{ width: 373, backgroundColor: "rgb(8, 49, 57)" }}
        >
          {searchHistory
            .reduce((uniqueCities, item) => {
              // Vérifiez si la ville est déjà présente dans uniqueCities
              const existingCity = uniqueCities.find(
                (city) => city.cityName === item.cityName
              );
              // Si ce n'est pas le cas, ajoutez la ville à uniqueCities
              if (!existingCity) {
                uniqueCities.push(item);
              }
              return uniqueCities;
            }, [])
            .slice(0, 6)
            .map((item, index) => {
              let showBorder = index + 1 < 6;
              let borderClass =
                searchHistory.length < 1 ? "" : showBorder ? "border-b-2" : "";

              return (
                <TouchableOpacity
                  onPress={() => handleLocationHistory(item)}
                  key={index}
                  className={
                    "flex-row items-center border-0 p-3 px-4 mb-1 " +
                    borderClass
                  }
                  style={{ borderColor: "rgb(199, 144, 51)" }}
                >
                  <Image
                    source={require("../assets/icons/pin.png")}
                    className="h-12 w-9"
                  />
                  <Text className="text-white text-lg ml-2">
                    {item.cityName}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      ) : null}
    </View>
  );
}
