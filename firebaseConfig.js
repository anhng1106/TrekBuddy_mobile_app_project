import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAss8YyS-Rml70B8_cvmwm3BTZnMJyRJsw",
  authDomain: "trekbuddy-95089.firebaseapp.com",
  databaseURL: "https://trekbuddy-95089.firebaseio.com",
  projectId: "trekbuddy-95089",
  storageBucket: "trekbuddy-95089.appspot.com",
  messagingSenderId: "849900630550",
  appId: "1:849900630550:web:8f3b86fd97cc3059a5bb37",
};

// Initialize Firebase only if not already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage here
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const fbStorage = getStorage(app);

// Function to upload files to Firebase Storage
const uploadToFirebase = async (uri, name, onProgress) => {
  try {
    const fetchResponse = await fetch(uri);
    const theBlob = await fetchResponse.blob();

    const imageRef = ref(fbStorage, `profile_images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, theBlob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ downloadUrl, metadata: uploadTask.snapshot.metadata });
        }
      );
    });
  } catch (error) {
    throw new Error(`Failed to upload file: ${error.message}`);
  }
};

export { app, auth, db, fbStorage, uploadToFirebase };
