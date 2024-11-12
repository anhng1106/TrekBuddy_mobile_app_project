import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";

// AboutPage component displays information about the app
const AboutPage = ({ navigation }) => {
  const { theme } = useContext(ThemeContext); // Access theme from context
  const styles = theme === "light" ? lightTheme : darkTheme;

  // Function to build a section title with padding and styling
  const renderSectionTitle = (text) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{text}</Text>
    </View>
  );

  // Function to build a paragraph text block with padding and styling
  const renderParagraph = (text) => (
    <View style={styles.paragraphContainer}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );

  // Function to build a bullet point list item with padding and styling
  const renderBulletPoint = (text) => (
    <View style={styles.bulletPointContainer}>
      <Text style={styles.bulletSymbol}>•</Text>
      <Text style={styles.bulletText}>{text}</Text>
    </View>
  );

  // Function to build contact information with an email link
  const renderContactInfo = (email) => (
    <TouchableOpacity
      onPress={() => {
        const emailUrl = `mailto:${email}`;
        Linking.canOpenURL(emailUrl).then((supported) => {
          if (supported) {
            Linking.openURL(emailUrl);
          } else {
            Alert.alert("Error", "Could not launch email client");
          }
        });
      }}
    >
      <Text style={styles.emailLink}>{email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon
            name="arrow-back"
            size={24}
            color={theme === "light" ? "#000" : "#fff"}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require("../assets/7.png")} // Replace with your image path
          style={styles.appLogo}
        />
        {/* {renderSectionTitle("About TrekBuddy")} */}
        {renderParagraph(
          "TrekBuddy is your ultimate travel companion, designed to help you discover amazing places to visit. Our goal is to create a platform where users can explore new destinations and share their experiences with friends."
        )}
        {renderSectionTitle("Features")}
        {renderBulletPoint("Explore a wide range of travel destinations")}
        {renderBulletPoint("User-friendly interface for easy navigation")}
        {renderBulletPoint("Connect with friends and share your journeys")}
        {renderBulletPoint(
          "Regular updates with new travel spots and features"
        )}
        {renderSectionTitle("Contact Us")}
        {renderParagraph(
          "If you have any questions or feedback, please contact us at:"
        )}
        {renderContactInfo("support@trekbuddy.com")}
      </ScrollView>
    </View>
  );
};

// Light theme styles
const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdeae2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdeae2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  appLogo: {
    width: 330,
    height: 200,
    alignSelf: "center",
    marginBottom: "-10%",
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  paragraphContainer: {
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
  bulletPointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 16,
    marginBottom: 8,
  },
  bulletSymbol: {
    fontSize: 16,
    marginRight: 8,
    color: "#000",
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000",
  },
  emailLink: {
    fontSize: 16,
    color: "#fc8fa7",
    textDecorationLine: "underline",
  },
});

// Dark theme styles
const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#545454",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#545454",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5,
    color: "#fff",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  appLogo: {
    width: 330,
    height: 200,
    alignSelf: "center",
    marginBottom: "-10%",
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  paragraphContainer: {
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
  },
  bulletPointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingLeft: 16,
    marginBottom: 8,
  },
  bulletSymbol: {
    fontSize: 16,
    marginRight: 8,
    color: "#ddd",
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ddd",
  },
  emailLink: {
    fontSize: 16,
    color: "#ff8a8a",
    textDecorationLine: "underline",
  },
});

export default AboutPage;
