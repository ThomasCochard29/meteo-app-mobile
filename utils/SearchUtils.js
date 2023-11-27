import citiesData from "../cities.json";

export const handleSearch = (text) => {
  const cities = citiesData["France"];

  // Limiter le nombre de résultats à afficher à 10
  const filtered = cities
    .filter((city) => city.label.toLowerCase().includes(text.toLowerCase()))
    .slice(0, 10);

  return filtered;
};
