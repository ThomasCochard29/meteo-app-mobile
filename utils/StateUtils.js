import { useState } from "react";

export const useHomeScreenState = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [ville, setVille] = useState("Longwy");
  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  return {
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
  };
};
