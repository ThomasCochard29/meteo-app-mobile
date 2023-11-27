export const getSunriseTime = (timestamp) => {
  const sunriseDate = new Date(timestamp * 1000); // Convertir le timestamp en millisecondes
  const hours = sunriseDate.getHours();
  const minutes = sunriseDate.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  return formattedTime;
};

export const getFormattedDate = (timestamp) => {
  // Créer un objet Date à partir du timestamp (en millisecondes)
  const date = new Date(timestamp * 1000);

  // Options pour formater la date en français
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // Formater la date
  const formattedDate = date.toLocaleDateString("fr-FR", options);

  // Retourner la date formatée
  return formattedDate;
};

export const imagePaths = {
  Lundi: require("../assets/images/cloud.png"),
  Mardi: require("../assets/images/orage.png"),
  Mercredi: require("../assets/images/snow.png"),
  Jeudi: require("../assets/images/mist.png"),
  Vendredi: require("../assets/images/nuageux.png"),
  Samedi: require("../assets/images/heavyrain.png"),
  Dimanche: require("../assets/images/smilingSun.png"),
};

export const jours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export const temperature = {
  Lundi: 10,
  Mardi: 8,
  Mercredi: 0,
  Jeudi: 6,
  Vendredi: 12,
  Samedi: 4,
  Dimanche: 14,
};
