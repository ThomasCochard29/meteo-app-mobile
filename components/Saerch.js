import React from "react";
import { View, TextInput, TouchableOpacity, Image, Text } from "react-native";
import { theme } from "../theme";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const SearchComponent = ({
  showSearch,
  toggleSearch,
  searchText,
  handleSearch,
  filteredLocations,
  handleLocation,
}) => {
  console.log(filteredLocations);
  return (
    <View
      style={{ height: "7%", width: "90%" }}
      className="mx-4 relative top-7 left-2 z-50"
    >
      <View
        className="flex-row justify-end items-center rounded-full"
        style={{
          backgroundColor: showSearch ? theme.bgWhite(0.2) : "transparent",
        }}
      >
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
      {filteredLocations.length > 0 && showSearch && searchText.length > 0 ? (
        <View
          className="absolute w-full top-16 rounded-3xl"
          style={{ backgroundColor: "rgb(8, 49, 57)" }}
        >
          {filteredLocations.slice(0, 8).map((loc, index) => {
            let showBorder = index + 1 < 6 && filteredLocations.length > 1;
            let borderClass = showBorder ? "border-b-2" : "";

            return (
              <TouchableOpacity
                onPress={() => handleLocation(loc)}
                key={index}
                className={
                  "flex-row items-center border-0 p-3 px-4 mb-1 " + borderClass
                }
                style={{ borderColor: "rgb(199, 144, 51)" }}
              >
                <Image
                  source={require("../assets/icons/pin.png")}
                  className="h-12 w-9"
                />
                <Text className="text-white text-lg ml-2">{loc.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default SearchComponent;
