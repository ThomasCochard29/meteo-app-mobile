import React from "react";
import { View, Text, Image } from "react-native";
import { theme } from "../theme";

const DailyWeather = ({ day, weatherIcon, temperature }) => {
  // console.log("T°", temperature);
  return (
    <View
      className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4 "
      style={{ backgroundColor: theme.bgWhite(0.15) }}
    >
      <Image source={weatherIcon} className="h-14 w-16" />
      <Text className="text-white">{day}</Text>
      <Text className="text-white text-xl font-semibold">
        {temperature}&#176;C
      </Text>
    </View>
  );
};

export default DailyWeather;
