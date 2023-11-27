import firebase from "../firebase";

export const handleSaveData = (cityName) => {
  const searchData = {
    cityName: cityName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const db = firebase.firestore();
  const searchHistoryRef = db.collection("search");

  return searchHistoryRef
    .add(searchData)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};
