// FlightsScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FlightsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search for Flights</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdeae2",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default FlightsScreen;
