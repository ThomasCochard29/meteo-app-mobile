import { API_METEO_KEY } from "@env";

export const fetchData = async (ville, setWeatherData) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${API_METEO_KEY}&lang=fr&units=metric`
    );

    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    const data = await response.json();
    // console.log(data);
    setWeatherData(data);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données météorologiques",
      error
    );
  }
};
