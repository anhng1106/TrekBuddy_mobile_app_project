import React from "react";
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

// AboutPage component displays information about the app
const AboutPage = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>About</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require("../assets/app_logo.png")} // Replace with your image path
          style={styles.appLogo}
        />
        {renderSectionTitle("About TrekBuddy")}
        {renderParagraph(
          "This app is designed to provide a fun and engaging gaming experience. Our goal is to create a platform where users can enjoy a variety of games and connect with friends."
        )}
        {renderSectionTitle("Features")}
        {renderBulletPoint("Multiple games to choose from")}
        {renderBulletPoint("User-friendly interface")}
        {renderBulletPoint("Connect with friends and compete")}
        {renderBulletPoint("Regular updates and new content")}
        {renderSectionTitle("Contact Us")}
        {renderParagraph(
          "If you have any questions or feedback, please contact us at:"
        )}
        {renderContactInfo("support@trekbuddy.com")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  appLogo: {
    width: 300, // Adjust width
    height: 100, // Adjust height
    alignSelf: "center",
    marginBottom: 20,
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  paragraphContainer: {
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
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
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
  },
  emailLink: {
    fontSize: 16,
    color: "#fc8fa7",
    textDecorationLine: "underline",
  },
});

export default AboutPage;
