import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";
import Slider from "./Slider";
import { ImageSlider } from "../data/SliderData";

Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require("../assets/app_logo.png")} style={styles.logo} />
        <TouchableOpacity
          onPress={() => navigation.navigate("ProfileScreen")}
          style={styles.iconContainer}
        ></TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>

      <Image
        source={require("../assets/explore.png")}
        style={styles.bannerImage}
      />

      <View style={styles.sliderContainer}>
        <Slider itemList={ImageSlider}></Slider>
      </View>
    </View>
  );
};

// Light theme styles
const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdeae2",
    paddingTop: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    height: 50,
    width: "35%",
    marginTop: -30,
    marginLeft: -30,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: -50,
    marginLeft: "25%",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 12,
    height: 30,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
  },
  iconContainer: {
    padding: 5,
  },
  icon: {
    color: "#000",
  },
  bannerImage: {
    width: "60%",
    height: 100,
    resizeMode: "cover",
    marginVertical: 30,
    marginHorizontal: "20%",
  },
  content: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  sliderContainer: {
    justifyContent: "center", // Center the slider vertically
    // alignItems: "center",
    marginBottom: "30%",
  },
});

// Dark theme styles
const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#545454",
    paddingTop: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    height: 50,
    width: "35%",
    marginTop: -30,
    marginLeft: -30,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 30,
    backgroundColor: "#333",
    fontSize: 16,
    width: "60%",
    alignSelf: "center",
  },
  iconContainer: {
    padding: 5,
  },
  icon: {
    color: "#fff",
  },
  content: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
});

export default HomeScreen;
