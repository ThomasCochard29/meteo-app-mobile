import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView } from "react-native";

// Firebase
import "firebase/compat/firestore";

// Utils
import { imagePaths, jours, temperature } from "../utils/DateUtils";
import { handleSaveData } from "../adapters/SaveHistoryDataFirebase";
import { useHomeScreenState } from "../utils/StateUtils";

// API
import { fetchData } from "../infrastructure/api/ApiClient";
import citiesData from "../cities.json";

// Components
import SearchComponent from "../components/Saerch";
import Weather from "../components/Weather";
import DailyWeather from "../components/DailyWeather";
import Params from "../components/Params";

export default function HomeScreen() {
  const {
    showSearch,
    toggleSearch,
    weatherData,
    setWeatherData,
    ville,
    setVille,
    searchText,
    setSearchText,
    filteredLocations,
    setFilteredLocations,
  } = useHomeScreenState();

  const handleSearch = (text) => {
    setSearchText(text);

    const cities = citiesData["France"];

    // Limiter le nombre de résultats à afficher à 10
    const filtered = cities
      .filter((city) => city.label.toLowerCase().includes(text.toLowerCase()))
      .slice(0, 10);

    setFilteredLocations(filtered);
  };

  useEffect(() => {
    fetchData(ville, setWeatherData);
  }, [ville]);

  const handleLocation = (loc) => {
    const cityName = loc.label;
    setVille(cityName);
    toggleSearch(false);
    handleSaveData(cityName);
    setSearchText("");
  };

  const handleLocationHistory = (item) => {
    const cityName = item.cityName;
    setVille(cityName);
    toggleSearch(false);
    handleSaveData(cityName);
    setSearchText("");
  };

  console.log(weatherData);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100} // ajustez selon vos besoins
    >
      <View className="flex-1 relative">
        <StatusBar style="dark" hidden={true} />
        <Image
          blurRadius={70}
          source={
            weatherData?.main?.temp > 0
              ? require("../assets/images/bg.png")
              : require("../assets/images/bgcold.png")
          }
          className="absolute h-full w-full"
        />
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <SearchComponent
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            searchText={searchText}
            handleSearch={handleSearch}
            filteredLocations={filteredLocations}
            handleLocation={handleLocation}
          />

          {searchText === "" && showSearch && (
            <Params
              showSearch={showSearch}
              toggleSearch={toggleSearch}
              searchText={searchText}
              handleSearch={handleSearch}
              handleLocationHistory={handleLocationHistory}
            />
          )}

          {/* forecast section */}
          {weatherData && <Weather weatherData={weatherData} />}

          {/* forecast for next days */}
          <View className="mb-2 space-y-3">
            <View className="mb-2 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <Image
                  source={require("../assets/icons/calendar.png")}
                  className="h-12 w-9"
                />
                <Text className="text-white text-base">Daily forecast</Text>
              </View>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
              >
                {jours.map((jour, index) => (
                  <DailyWeather
                    key={index}
                    day={jour}
                    weatherIcon={imagePaths[jour]}
                    temperature={temperature[jour]}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}
