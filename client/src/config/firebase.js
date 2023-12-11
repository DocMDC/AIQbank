// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCerhb_Mz0Q3RYQJu3TnUvvRXK-X1von4k",
  authDomain: "aiqbank-f7fe3.firebaseapp.com",
  projectId: "aiqbank-f7fe3",
  storageBucket: "aiqbank-f7fe3.appspot.com",
  messagingSenderId: "579888705310",
  appId: "1:579888705310:web:872dab3f6a79107f88a30f",
  measurementId: "G-XS0EY2VTWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()
export const storage = getStorage()

