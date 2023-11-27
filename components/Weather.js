import React from "react";
import { View, Text, Image } from "react-native";
import { getFormattedDate, getSunriseTime } from "../utils/DateUtils";

const Weather = ({ weatherData }) => {
  // Fonction pour obtenir le chemin de l'image en fonction de la description
  const getWeatherImage = () => {
    const description = weatherData?.weather[0]?.description.toLowerCase();
    const basePath = "../assets/images/";

    switch (description) {
      case "couvert":
        return require(basePath + "nuageux.png");
      case "ciel dégagé":
        return require(basePath + "smilingSun.png");
      case "légère pluie":
        return require(basePath + "legerePluie.png");
      case "nuageux":
        return require(basePath + "cloud.png");
      case "chutes de neige":
        return require(basePath + "snow.png");
      case "légères chutes de neige":
        return require(basePath + "snow.png");
      case "pluie":
        return require(basePath + "rain.png");
      case "orage":
        return require(basePath + "orage.png");
      case "brume":
        return require(basePath + "mist.png");
      // Ajoutez d'autres cas selon vos besoins
      default:
        return require(basePath + "nuageux.png"); // Image par défaut si la description ne correspond à aucun cas
    }
  };

  return (
    <View className="mx-4 flex justify-around flex-1 mt-3">
      {/* location */}
      <View>
        <Text className="text-white text-center text-2xl font-bold">
          {weatherData?.name}, {""}
          <Text className="text-lg font-semibold text-gray-300">
            {weatherData?.sys?.country}
          </Text>
        </Text>
        <Text className="text-lg font-semibold text-gray-300 text-center mt-2 uppercase">
          {getFormattedDate(weatherData?.dt)}
        </Text>
      </View>
      {/* weather image */}
      <View className="flex-row justify-center">
        <Image source={getWeatherImage()} className="w-52 h-48" />
      </View>
      {/* degree celcius */}
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-5xl ml-5">
          {weatherData?.main?.temp}&#176;C
        </Text>
        <View className="flex flex-row justify-center">
          <Text className="text-center text-white text-xl tracking-widest capitalize mr-6">
            <Text className="text-amber-300">Min :</Text>{" "}
            {weatherData?.main?.temp_min}
            &#176;C
          </Text>
          <Text className="text-center text-white text-xl tracking-widest capitalize">
            <Text className="text-amber-500">Max :</Text>{" "}
            {weatherData?.main?.temp_max}
            &#176;C
          </Text>
        </View>
        <Text className="text-center text-white text-xl tracking-widest uppercase">
          {weatherData?.weather[0]?.description}
        </Text>
      </View>
      {/* other stats */}
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-3 items-center">
          <Image
            source={require("../assets/icons/wind.png")}
            className="h-10 w-10"
          />
          <Text className="text-white font-semibold text-xl text-gray-400">
            {weatherData?.wind?.speed}km
          </Text>
        </View>
        <View className="flex-row space-x-3 items-center">
          <Image
            source={require("../assets/icons/water.png")}
            className="w-6"
            style={{ height: 42 }}
          />
          <Text className="text-white font-semibold text-xl text-cyan-500">
            {weatherData?.main?.humidity}%
          </Text>
        </View>
        <View className="flex-row space-x-3 items-center">
          <Image
            source={require("../assets/icons/sunrise.png")}
            className="h-12 w-9"
          />
          <Text className="text-white font-semibold text-xl     ">
            {getSunriseTime(weatherData?.sys?.sunrise)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Weather;
