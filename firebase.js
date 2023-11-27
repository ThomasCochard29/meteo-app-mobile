//firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  API_FIREBASE_KEY,
  API_FIREBASE_AUTHDOMAIN,
  API_FIREBASE_PROJECTID,
  API_FIREBASE_STORAGEBUCKET,
  API_FIREBASE_MESSASINGSENDERID,
  API_FIREBASE_APPID,
} from "@env";

const firebaseConfig = {
  apiKey: API_FIREBASE_KEY,
  authDomain: API_FIREBASE_AUTHDOMAIN,
  projectId: API_FIREBASE_PROJECTID,
  storageBucket: API_FIREBASE_STORAGEBUCKET,
  messagingSenderId: API_FIREBASE_MESSASINGSENDERID,
  appId: API_FIREBASE_APPID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
console.log("Firebase Initialisé:", firebase.apps.length);

export default firebase;
