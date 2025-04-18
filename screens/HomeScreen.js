import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ThemeContext } from "../ThemeContext";
import Slider from "./Slider";
import { ImageSlider } from "../data/SliderData";
import { GOOGLE_API_KEY } from "@env";
import { SavedContext } from "../data/SavedContext";
import i18n from "../utils/i18n";

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { collections, saveItemToCollection } = useContext(SavedContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  const [searchTerm, setSearchTerm] = useState("");
  const [famousCities, setFamousCities] = useState([]);
  const [touristDestinations, setTouristDestinations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [isViewingDestinations, setIsViewingDestinations] = useState(false); // Track current view
  const [isMapView, setIsMapView] = useState(false);
  const [focusedLocation, setFocusedLocation] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToSave, setItemToSave] = useState(null);

  // Function to fetch famous cities based on the search term
  const fetchFamousCities = async () => {
    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=cities+in+${searchTerm}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      console.log("Google Places API response:", data);

      if (data.results) {
        // Map city results to extract necessary data
        const cities = data.results.map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.formatted_address,
          location: place.geometry?.location,
          photo: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
            : "https://via.placeholder.com/150",
        }));
        setFamousCities(cities);
        setTouristDestinations([]);
        setIsViewingDestinations(false);
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
          location: place.geometry?.location,
          photo: place.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
            : "https://via.placeholder.com/150",
        }));
        setTouristDestinations(destinations);
        setSelectedCity(cityName);
        setIsViewingDestinations(true);
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
      setIsViewingDestinations(false);
    }
  };

  const saveToAlbum = (item) => {
    setItemToSave(item); // Store the item to save
    setIsModalVisible(true); // Open the modal
  };

  const handleSaveToCollection = (collectionId) => {
    saveItemToCollection(collectionId, itemToSave); // Save the item to the selected collection
    setIsModalVisible(false); // Close the modal
    Alert.alert(
      i18n.t("success"),
      `${itemToSave.name} ${i18n.t("savedToAlbum")}`
    );
  };

  const handleShowOnMap = (location) => {
    if (!location || !location.lat || !location.lng) {
      Alert.alert(
        "Location not found",
        "This item does not have a valid location. Please try another."
      );
      return;
    }
    setFocusedLocation(location);
    setIsMapView(true);
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
    <View style={styles.placeItem}>
      <Image source={{ uri: item.photo }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{item.name}</Text>
        <Text style={styles.placeAddress}>{item.address}</Text>
        <TouchableOpacity
          style={styles.saveToAlbumButton}
          onPress={() => saveToAlbum(item)}
        >
          <Text style={styles.saveToAlbumButtonText}>
            {i18n.t("addToFavorites")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showMapButton}
          onPress={() => handleShowOnMap(item.location)}
        >
          <Text style={styles.showMapButtonText}>{i18n.t("showOnMap")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image source={require("../assets/app_logo.png")} style={styles.logo} />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={i18n.t("enterCity")}
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
      {isMapView ? (
        <View style={styles.mapContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setIsMapView(false), setFocusedLocation(null);
            }}
          >
            <Text style={styles.backButtonText}>
              ← {i18n.t("backToDestinations")}
            </Text>
          </TouchableOpacity>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: focusedLocation?.lat || 60.200692,
              longitude: focusedLocation?.lng || 24.934302,
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221,
            }}
          >
            {focusedLocation && (
              <Marker
                coordinate={{
                  latitude: focusedLocation.lat,
                  longitude: focusedLocation.lng,
                }}
                title="Selected Location"
              />
            )}
          </MapView>
        </View>
      ) : isViewingDestinations ? (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsViewingDestinations(false)}
          >
            <Text style={styles.backButtonText}>
              ← {i18n.t("backToCities")}
            </Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>
            {i18n.t("famousDestinations")} {selectedCity}
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
          <Text style={styles.sectionTitle}>{i18n.t("famousCities")}</Text>
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

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t("selectCollection")}</Text>
            <FlatList
              data={collections}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.collectionItem}
                  onPress={() => handleSaveToCollection(item.id)}
                >
                  <Text style={styles.collectionTitle}>{item.title}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>{i18n.t("noCollections")}</Text>
              }
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>{i18n.t("close")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  mapContainer: {
    width: "100%",
    height: 700,
    marginVertical: "-10%",
  },
  map: {
    flex: 1,
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
  backButton: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: "#e8486a",
    fontWeight: "bold",
  },
  showMapButton: {
    backgroundColor: "#8f8bd6",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
  },
  showMapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  saveToAlbumButton: {
    backgroundColor: "#fc8fa7",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
  },
  saveToAlbumButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  collectionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  collectionTitle: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fc8fa7",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
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
  mapContainer: {
    width: "100%",
    height: 700,
    marginVertical: "-10%",
  },
  map: {
    flex: 1,
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
    color: "#fff",
  },
  backButton: {
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: "#e8486a",
    fontWeight: "bold",
  },
  showMapButton: {
    backgroundColor: "#8f8bd6",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
  },
  showMapButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  saveToAlbumButton: {
    backgroundColor: "#fc8fa7",
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
  },
  saveToAlbumButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  collectionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  collectionTitle: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fc8fa7",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
});

export default HomeScreen;
