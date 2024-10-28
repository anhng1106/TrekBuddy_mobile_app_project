import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState(auth.currentUser.email || "");
  const [username, setUsername] = useState("");
  const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

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
      setModalVisible(false); // Close the modal
      Alert.alert("Success", "Username updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update username: " + error.message);
    }
  };

  const updateProfilePicture = async () => {
    const result = await launchImageLibrary();
    if (result.didCancel || !result.assets || result.assets.length === 0) {
      return;
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

  const updateEmail = async () => {
    try {
      await auth.currentUser.updateEmail(email);
      Alert.alert("Success", "Email updated successfully!");
    } catch (error) {
      setErrorMessage("Failed to update email: " + error.message);
    }
  };

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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>

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

      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for editing username */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={usernameInput}
              onChangeText={setUsernameInput}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={updateUsername}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
  usernameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  editIcon: {
    fontSize: 18,
    marginLeft: 8,
    color: "#007AFF",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
  },
});

export default ProfileScreen;
