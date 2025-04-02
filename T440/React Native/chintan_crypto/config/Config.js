// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2752vPEeEQP5byWw3zrv8je4a_KnyuB0",
    authDomain: "crypto-8716e.firebaseapp.com",
    projectId: "crypto-8716e",
    storageBucket: "crypto-8716e.firebasestorage.app",
    messagingSenderId: "104558545784",
    appId: "1:104558545784:web:acc85124d9ba757338168d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
