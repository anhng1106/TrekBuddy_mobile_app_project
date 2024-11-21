import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";
import Slider from "./Slider";
import { ImageSlider } from "../data/SliderData";
import { GOOGLE_API_KEY } from "@env";

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  const [searchTerm, setSearchTerm] = useState("");
  const [famousCities, setFamousCities] = useState([]);
  const [touristDestinations, setTouristDestinations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  // Function to fetch famous cities based on the search term
  const fetchFamousCities = async () => {
    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cities+in+${searchTerm}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        // Map city results to extract necessary data
        const cities = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          photo: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
            : "https://via.placeholder.com/150",
        }));
        setFamousCities(cities);
        setTouristDestinations([]);
      } else {
        setFamousCities([]);
      }
    } catch (error) {
      console.error("Error fetching famous cities:", error);
    }
  };

  const fetchTouristDestinations = async (cityName) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${cityName}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.results) {
        const destinations = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          photo: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
            : "https://via.placeholder.com/150",
        }));
        setTouristDestinations(destinations);
        setSelectedCity(cityName);
      } else {
        setTouristDestinations([]);
      }
    } catch (error) {
      console.error("Error fetching tourist destinations:", error);
    }
  };

  const handleSearchTermChange = (text) => {
    setSearchTerm(text);

    // Clear city results when search bar is cleared
    if (text.trim() === "") {
      setFamousCities([]);
      setTouristDestinations([]);
    }
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.placeItem}
      onPress={() => fetchTouristDestinations(item.name)}
    >
      <Image source={{ uri: item.photo }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity style={styles.placeItem}>
      <Image source={{ uri: item.photo }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeAddress}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require("../assets/app_logo.png")} style={styles.logo} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Enter country or city..."
          placeholderTextColor="#888"
          value={searchTerm}
          onChangeText={handleSearchTermChange}
          onSubmitEditing={fetchFamousCities}
        />
      </View>

      <Image
        source={require("../assets/explore.png")}
        style={styles.bannerImage}
      />

      {/* Conditionally render slider, cities, or tourist destinations */}
      {touristDestinations.length > 0 ? (
        // <View style={styles.sliderContainer}>
        //   <Slider itemList={ImageSlider} />
        // </View>
        <>
          <Text style={styles.sectionTitle}>
            Famous Destinations in {selectedCity}
          </Text>
          <FlatList
            data={touristDestinations}
            renderItem={renderDestinationItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.placesList}
          />
        </>
      ) : famousCities.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>Famous Cities</Text>
          <FlatList
            data={famousCities}
            renderItem={renderCityItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.placesList}
          />
        </>
      ) : (
        <View style={styles.sliderContainer}>
          <Slider itemList={ImageSlider} />
        </View>
      )}
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
  bannerImage: {
    width: "60%",
    height: 100,
    resizeMode: "cover",
    marginVertical: 25,
    marginHorizontal: "23%",
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
    justifyContent: "center",
    marginBottom: "43%",
  },
  placesList: {
    paddingBottom: 20,
  },
  placeItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  placeInfo: {
    flex: 1,
    justifyContent: "center",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  placeAddress: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
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
  bannerImage: {
    width: "60%",
    height: 100,
    resizeMode: "cover",
    marginVertical: 25,
    marginHorizontal: "23%",
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
    justifyContent: "center",
    marginBottom: "43%",
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  placeInfo: {
    flex: 1,
    justifyContent: "center",
  },
  placeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  placeAddress: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default HomeScreen;
