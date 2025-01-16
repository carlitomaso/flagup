// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpdGjt59s9Ym5Da98zyvmyNvRyjmOCxr4",
  authDomain: "flagup-507bf.firebaseapp.com",
  projectId: "flagup-507bf",
  storageBucket: "flagup-507bf.firebasestorage.app",
  messagingSenderId: "1010434968515",
  appId: "1:1010434968515:web:bd3f57c9910ca50b8ecb76",
  measurementId: "G-FFYQ3M950L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Firestore Database
export const auth = getAuth(app);