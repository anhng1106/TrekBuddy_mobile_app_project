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
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth
import { auth } from "../firebaseConfig";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please fill in both email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      navigation.navigate("HomeScreen"); // Navigate to HomeScreen upon successful login
    } catch (error) {
      // Handle authentication errors
      if (error.code === "auth/user-not-found") {
        Alert.alert("Error", "User not found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "Incorrect password. Please try again.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  const handleSignup = () => {
    // navigate to the Signup screen
    navigation.navigate("SignupScreen");
  };

  const styles = theme === "light" ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTheme}>
        <Icon
          name={theme === "light" ? "moon" : "sunny"}
          size={30}
          color={theme === "light" ? "#000" : "#fff"}
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/app_name.png")} // Adjust the path based on your directory structure
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={theme === "light" ? "#999" : "#888"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>
          Do not have an account yet?{" "}
          <Text style={styles.signupLink}>Sign Up</Text>
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
