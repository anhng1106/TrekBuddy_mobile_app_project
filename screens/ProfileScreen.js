import React, { useEffect, useState, useContext } from "react";
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
import { ThemeContext } from "../ThemeContext";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";

const ProfileScreen = ({ navigation }) => {
  const [email, setEmail] = useState(auth.currentUser.email || "");
  const [newEmail, setNewEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

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

  const openEmailModal = () => {
    setEmailModalVisible(true);
  };

  const closeEmailModal = () => {
    setEmailModalVisible(false);
    setPassword(""); // Clear password input
  };

  const handleUpdateEmail = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }

    if (!newEmail.trim()) {
      Alert.alert("Error", "Please enter a new email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      // Update the email
      await updateEmail(user, newEmail.trim());

      // Send a verification email to the new email
      await sendEmailVerification(user);

      Alert.alert(
        "Email Verification Sent",
        "A verification email has been sent to your new email address. Please verify it before logging in again."
      );

      // Optionally sign the user out to ensure verification
      await auth.signOut();
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Error updating email:", error.message);

      if (error.code === "auth/requires-recent-login") {
        Alert.alert(
          "Reauthentication Required",
          "You need to log in again to perform this operation."
        );
      } else {
        Alert.alert("Error", error.message || "Failed to update email.");
      }
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back"
            size={24}
            color={theme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

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
          <Icon name="camera" size={24} color="#fc8fa7" />
        </TouchableOpacity>
      </View>

      <View style={styles.usernameContainer}>
        <Text style={styles.usernameText}>{username}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="pencil" size={24} color="#fc8fa7" />
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
              placeholderTextColor="#999997"
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
      <Text style={styles.emailText}>{email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setEmailModalVisible(true)}
      >
        <Text style={styles.buttonText}>Update Email</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEmailModalVisible}
        onRequestClose={closeEmailModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Update Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new email"
              placeholderTextColor="#999997"
              value={newEmail}
              onChangeText={setNewEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter current password"
              placeholderTextColor="#999997"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateEmail}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={closeEmailModal}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

// Light theme styles
const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdeae2", // Light theme background
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdeae2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
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
    right: "35%",
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
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#fc8fa7",
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
  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emailText: {
    fontSize: 16,
    color: "#000",
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
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

// Dark theme styles
const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#545454", // Dark theme background
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#545454",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5, // Align to the left
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  profilePictureContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
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
    right: "35%",
  },
  cameraIconText: {
    color: "#fc8fa7", // Icon color
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
    color: "#fff", // White text for dark theme
  },
  editIcon: {
    fontSize: 18,
    marginLeft: 8,
    color: "#fc8fa7", // Icon color
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#fff", // White label text
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    backgroundColor: "#fc8fa7",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff", // White text for buttons
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
    backgroundColor: "#333", // Dark background for modal
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff", // White text for modal title
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
