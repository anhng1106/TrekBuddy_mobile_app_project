// screens/RestaurantsScreen.js
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemeContext } from "../ThemeContext";
import i18n from "../utils/i18n";
import { GOOGLE_API_KEY } from "@env";

const RestaurantsScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightStyles : darkStyles;

  const { cityName } = route.params;
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants(cityName);
  }, [cityName]);

  const fetchRestaurants = async (city) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${city}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      const list = data.results.map((place) => ({
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        photo: place.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
          : "https://via.placeholder.com/150",
      }));
      setRestaurants(list);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {i18n.t("restaurantsIn")} {cityName}
      </Text>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const baseStyles = {
  container: { flex: 1, padding: 16 },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: { width: 80, height: 80 },
  info: { flex: 1, padding: 10 },
  title: { fontWeight: "bold", fontSize: 16 },
  subtitle: { fontSize: 14, color: "#666" },
};

const lightStyles = StyleSheet.create(baseStyles);
const darkStyles = StyleSheet.create({
  ...baseStyles,
  container: { ...baseStyles.container, backgroundColor: "#545454" },
  heading: { ...baseStyles.heading, color: "#fff" },
  itemContainer: { ...baseStyles.itemContainer, backgroundColor: "#333" },
  title: { ...baseStyles.title, color: "#fff" },
  subtitle: { ...baseStyles.subtitle, color: "#ccc" },
});

export default RestaurantsScreen;
