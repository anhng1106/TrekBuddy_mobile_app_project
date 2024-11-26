import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Mailer from "react-native-mail";
import { ThemeContext } from "../ThemeContext";

const DataProtectionPolicyPage = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  const renderSectionTitle = (text) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{text}</Text>
    </View>
  );

  // Function to build paragraphs with padding and styling
  const renderParagraph = (text) => (
    <View style={styles.paragraphContainer}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );

  // Function to create an email link that opens the default mail app
  const renderEmailLink = (email) => (
    <TouchableOpacity
      onPress={() => {
        Mailer.mail(
          {
            subject: "Data Protection Inquiry",
            recipients: [email],
          },
          (error, event) => {
            if (error) {
              Alert.alert("Error", "Could not launch email client");
            }
          }
        );
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
        <Text style={styles.headerTitle}>Data Protection Policy</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image
          source={require("../assets/6.png")} // Replace with your image path
          style={styles.appLogo}
        />
        {/* {renderSectionTitle("Data Protection Policy")} */}
        {renderSectionTitle("1. Introduction")}
        {renderParagraph(
          "We are committed to protecting your personal data and ensuring its privacy, security, and confidentiality."
        )}
        {renderSectionTitle("2. Data Collection")}
        {renderParagraph(
          "We collect personal data that you provide to us directly, such as when you create an account, use our services, or contact us for support."
        )}
        {renderSectionTitle("3. Data Use")}
        {renderParagraph(
          "We use your personal data to provide and improve our services, communicate with you, and ensure the security of our platform."
        )}
        {renderSectionTitle("4. Data Sharing")}
        {renderParagraph(
          "We do not share your personal data with third parties except as necessary to provide our services, comply with legal obligations, or protect our rights."
        )}
        {renderSectionTitle("5. Data Security")}
        {renderParagraph(
          "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or misuse."
        )}
        {renderSectionTitle("6. Your Rights")}
        {renderParagraph(
          "You have the right to access, correct, or delete your personal data, as well as the right to object to or restrict certain processing of your data."
        )}
        {renderSectionTitle("7. Contact Us")}
        {renderParagraph(
          "If you have any questions or concerns about our data protection practices, please contact us at:"
        )}
        {renderEmailLink("support@trekbuddy.com")}
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
    height: 150,
    alignSelf: "center",
    marginBottom: "5%",
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  paragraphContainer: {
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
  },
  emailLink: {
    fontSize: 16,
    color: "#ff8a8a",
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
    height: 150,
    alignSelf: "center",
    marginBottom: "5%",
  },
  sectionTitleContainer: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
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
  emailLink: {
    fontSize: 16,
    color: "#ff8a8a",
    textDecorationLine: "underline",
  },
});

export default DataProtectionPolicyPage;
