// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCYosU0Zh3xYX_s4-Spe4NkqALYtL4Oo0",
  authDomain: "weatherapp-7b5ce.firebaseapp.com",
  projectId: "weatherapp-7b5ce",
  storageBucket: "weatherapp-7b5ce.firebasestorage.app",
  messagingSenderId: "247351516477",
  appId: "1:247351516477:web:c636e621e3f88b2e36b954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
export const db = getFirestore(app);