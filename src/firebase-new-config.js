import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const newFirebaseConfig = {
  apiKey: "AIzaSyCtMANj0d17wJsrAz0P05XFinUp15NLpDc",
  authDomain: "moufit-latest.firebaseapp.com",
  projectId: "moufit-latest",
  storageBucket: "moufit-latest.appspot.com",
  messagingSenderId: "300640201917",
  appId: "1:300640201917:web:f3db8f66f5b2d171e91bd4",
  measurementId: "G-CYSBGB07BQ",
};

export const newApp = initializeApp(newFirebaseConfig, 'secondary');
export const newDB = getFirestore(newApp);
export const newAuth = getAuth(newApp);