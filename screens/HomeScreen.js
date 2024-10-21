import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeScreen = ({ navigation }) => {
  const handleProfile = () => {
    navigation.navigate("ProfileScreen"); // Navigate to a profile screen (you should create this)
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../assets/app_logo.png")} // Adjust the path as needed
          style={styles.logo}
        />

        <TouchableOpacity onPress={handleProfile} style={styles.iconContainer}>
          <Icon name="person-circle-outline" size={30} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>

      <View style={styles.content}>
        <Text>Welcome to the Home Page!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40, // Adjust depending on the status bar height
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
    width: "35%",
    marginTop: -30,
    marginLeft: -30,
  },
  searchContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 20,
    height: 30,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    width: "60%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: -52,
    marginLeft: 50,
  },
  iconContainer: {
    padding: 5,
  },
  icon: {
    color: "#000",
    marginRight: -10,
    marginTop: -33,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default HomeScreen;
