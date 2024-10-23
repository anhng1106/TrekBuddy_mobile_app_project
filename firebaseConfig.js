import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth"; // Import Firebase Authentication

const firebaseConfig = {
  apiKey: "AIzaSyAss8YyS-Rml70B8_cvmwm3BTZnMJyRJsw",
  authDomain: "trekbuddy-95089.firebaseapp.com",
  projectId: "trekbuddy-95089",
  storageBucket: "trekbuddy-95089.appspot.com",
  messagingSenderId: "849900630550",
  appId: "YOUR_APP_ID",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
