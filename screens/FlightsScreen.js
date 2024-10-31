import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import axios from "axios";
// import { AMADEUS_API_KEY, AMADEUS_API_SECRET } from "@env";

const FlightsScreen = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  // Method to fetch flight offers
  const searchFlights = async () => {
    setLoading(true);
    setFlights([]); // Clear previous results

    try {
      // First, get access token
      const authResponse = await axios.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        {
          grant_type: "client_credentials",
          client_id: AMADEUS_API_KEY,
          client_secret: AMADEUS_API_SECRET,
        }
      );

      const token = authResponse.data.access_token;

      // Fetch flight offers
      const response = await axios.get(
        `https://test.api.amadeus.com/v2/shopping/flight-offers`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate,
            adults: 1,
          },
        }
      );

      setFlights(response.data.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Flights</Text>
      <TextInput
        style={styles.input}
        placeholder="Origin (e.g., LAX)"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination (e.g., JFK)"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Departure Date (YYYY-MM-DD)"
        value={departureDate}
        onChangeText={setDepartureDate}
      />
      <Button title="Search Flights" onPress={searchFlights} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={flights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.flightItem}>
              <Text style={styles.flightText}>
                {item.itineraries[0].segments[0].departure.iataCode} ➔{" "}
                {item.itineraries[0].segments[0].arrival.iataCode}
              </Text>
              <Text style={styles.flightText}>Price: ${item.price.total}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  flightItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  flightText: {
    fontSize: 16,
  },
});

export default FlightsScreen;
