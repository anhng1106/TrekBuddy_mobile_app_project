import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { ThemeContext } from "../ThemeContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { auth, db } from "../firebaseConfig"; // Import Firestore instance
import i18n from "../utils/i18n";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext);

  // Handle the sign-up button press
  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert(i18n.t("missingFields"), i18n.t("fillAllFields"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(i18n.t("passwordsMismatch"), i18n.t("ensurePasswordsSame"));
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User account created:", user);

      // Store the username and email in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        username: username,
        email: email,
      });

      // Send a verification email
      await sendEmailVerification(user);

      Alert.alert(i18n.t("verifyEmailTitle"), i18n.t("verifyEmailMsg"), [
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
      ]);

      // Sign out the user after sending the email verification
      await auth.signOut();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert(i18n.t("emailInUse"), i18n.t("useDifferentEmail"));
      } else {
        Alert.alert(i18n.t("signupFailed"), error.message);
      }
    }
  };

  const styles = theme === "light" ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/create_account.png")} // Adjust the path based on your directory structure
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t("email")}
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t("username")}
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t("password")}
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder={i18n.t("confirmPassword")}
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>{i18n.t("signUp")}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.signupText}>
          {i18n.t("alreadyHaveAccount")}{" "}
          <Text style={styles.signupLink}>{i18n.t("signIn")}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Light and dark theme styles
const lightTheme = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fdeae2",
    padding: 20,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: -100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  button: {
    backgroundColor: "#fc8fa7",
    padding: 13,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#000",
    fontSize: 17,
    marginTop: 20,
  },
  signupLink: {
    color: "#fc8fa7",
    fontWeight: "bold",
  },
};

const darkTheme = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#545454",
    padding: 20,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: -100,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 18,
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    backgroundColor: "#fc8fa7",
    padding: 13,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 17,
    marginTop: 20,
  },
  signupLink: {
    color: "#fc8fa7",
    fontWeight: "bold",
  },
};

export default SignupScreen;
