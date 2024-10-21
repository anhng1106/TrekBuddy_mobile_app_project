import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login functionality here
    console.log("Login with:", email, password);
    // Navigate to the Home/Search screen
    navigation.navigate("HomeScreen");
  };

  const handleSignup = () => {
    // Handle signup functionality here
    console.log("Signup with:", email, password);
    // Navigate to the Home/Search screen
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/app_name.png")} // Adjust the path based on your directory structure
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 450,
    height: 250,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: -200,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default LoginScreen;
