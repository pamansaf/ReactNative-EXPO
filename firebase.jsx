// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRrdwXHpsEsQ7qAebzdpYMzpCBEBUERks",
  authDomain: "myapps-27908.firebaseapp.com",
  projectId: "myapps-27908",
  storageBucket: "myapps-27908.firebasestorage.app",
  messagingSenderId: "882045732070",
  appId: "1:882045732070:web:6728b3ec968872b1592727"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);