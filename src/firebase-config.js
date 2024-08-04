// const { initializeApp } = require("firebase/app");
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBME-4ySfC5F4saYIN8ENnfTRZKmMhchV8",
    authDomain: "moufit-prod.firebaseapp.com",
    databaseURL: "https://moufit-prod.firebaseio.com",
    projectId: "moufit-prod",
    storageBucket: "moufit-prod.appspot.com",
    messagingSenderId: "330729356891",
    appId: "1:330729356891:web:a62989616648fc78ed097e",
    measurementId: "G-P0EESMWKPL"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);