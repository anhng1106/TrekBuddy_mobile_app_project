import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAss8YyS-Rml70B8_cvmwm3BTZnMJyRJsw",
  authDomain: "trekbuddy-95089.firebaseapp.com",
  projectId: "trekbuddy-95089",
  storageBucket: "trekbuddy-95089.appspot.com",
  messagingSenderId: "849900630550",
  appId: "1:849900630550:web:8f3b86fd97cc3059a5bb37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
