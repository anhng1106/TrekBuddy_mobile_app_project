import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";
import { LanguageContext } from "../LanguageContext";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { auth } from "../firebaseConfig";
import i18n from "../utils/i18n";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(i18n.t("missingFields"), i18n.t("fillEmailPassword"));
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          i18n.t("emailNotVerified"),
          i18n.t("verifyEmailBeforeLogin")
        );
        await auth.signOut(); // Sign out the user if the email is not verified
        return;
      }

      console.log("User logged in:", user);
      navigation.navigate("HomeScreen");
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          message = i18n.t("userNotFound");
          break;
        case "auth/wrong-password":
          message = i18n.t("wrongPassword");
          break;
        case "auth/invalid-email":
          message = i18n.t("invalidEmail");
          break;
        case "auth/too-many-requests":
          message = i18n.t("tooManyRequests");
          break;
        default:
          message = i18n.t("genericLoginError");
      }
      Alert.alert(i18n.t("loginFailed"), message);
    }
  };

  const handleSignup = () => {
    // navigate to the Signup screen
    navigation.navigate("SignupScreen");
  };

  const styles = theme === "light" ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity onPress={toggleLanguage} style={styles.iconButton}>
          <Icon
            name={language === "en" ? "flag-outline" : "globe-outline"}
            size={26}
            color={theme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Icon
            name={theme === "light" ? "moon" : "sunny"}
            size={26}
            color={theme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      <Image source={require("../assets/app_name.png")} style={styles.logo} />
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
        placeholder={i18n.t("password")}
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{i18n.t("signIn")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>
          {i18n.t("noAccountYet")}{" "}
          <Text style={styles.signupLink}>{i18n.t("signUp")}</Text>
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
  topIcons: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    right: 20,
    gap: 12,
    zIndex: 1,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: -200,
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
  toggleButton: {
    position: "absolute",
    top: 5, // Move the icon closer to the very top
    right: 20,
    zIndex: 1, // Ensure it's on top of other components
  },
};

const darkTheme = {
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#545454",
    padding: 20,
  },
  topIcons: {
    flexDirection: "row",
    position: "absolute",
    top: 40,
    right: 20,
    gap: 12,
    zIndex: 1,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: -200,
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
  toggleButton: {
    position: "absolute",
    top: 5, // Move the icon closer to the very top
    right: 20,
    zIndex: 1, // Ensure it's on top of other components
  },
};

export default LoginScreen;
