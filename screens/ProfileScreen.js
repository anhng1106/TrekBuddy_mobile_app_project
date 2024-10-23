import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Button,
} from "react-native";
import { auth, db, storage } from "../firebaseConfig"; // Make sure to import your Firebase config
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState(auth.currentUser.email || "");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");

  // Fetch user data when the profile page is initialized
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || "Unknown");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch username: " + error.message);
      }
    };
    fetchUsername();
  }, []);

  // Update the username in Firestore
  const updateUsername = async () => {
    if (usernameInput.trim() === "") {
      setErrorMessage("Username cannot be empty.");
      return;
    }

    try {
      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        username: usernameInput.trim(),
      });
      setUsername(usernameInput.trim());
      setErrorMessage("");
      Alert.alert("Success", "Username updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update username: " + error.message);
    }
  };

  // Update the profile picture
  const updateProfilePicture = async () => {
    const result = await launchImageLibrary();
    if (result.didCancel || !result.assets || result.assets.length === 0) {
      return; // User canceled or no image selected
    }

    const imageUri = result.assets[0].uri;

    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `profile_pictures/${auth.currentUser.uid}.jpg`
      );
      await uploadBytes(storageRef, blob);

      const photoURL = await getDownloadURL(storageRef);

      await auth.currentUser.updateProfile({ photoURL });

      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        photoURL,
      });

      setPhotoURL(photoURL);
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update profile picture: " + error.message);
    }
  };

  // Update the email
  const updateEmail = async () => {
    try {
      await auth.currentUser.updateEmail(email);
      Alert.alert("Success", "Email updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update email: " + error.message);
    }
  };

  // Log out the user
  const signOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("LoginScreen");
    } catch (error) {
      setErrorMessage("Failed to sign out: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={
            photoURL
              ? { uri: photoURL }
              : require("../assets/default_avatar.jpeg")
          }
          style={styles.profilePicture}
        />
        <TouchableOpacity
          onPress={updateProfilePicture}
          style={styles.cameraIcon}
        >
          <Text style={styles.cameraIconText}>📸</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Username</Text>
      <Text style={styles.usernameText}>{username}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new username"
        value={usernameInput}
        onChangeText={setUsernameInput}
      />
      <TouchableOpacity style={styles.button} onPress={updateUsername}>
        <Text style={styles.buttonText}>Update Username</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={updateEmail}>
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 5,
  },
  cameraIconText: {
    color: "#fff",
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ProfileScreen;
