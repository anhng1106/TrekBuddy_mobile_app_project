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
import i18n from "../utils/i18n";

const DataProtectionPolicyPage = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  const renderSectionTitle = (text) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>{text}</Text>
    </View>
  );

  const renderParagraph = (text) => (
    <View style={styles.paragraphContainer}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );

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
        <Text style={styles.headerTitle}>{i18n.t("dataPolicy")}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={require("../assets/6.png")} style={styles.appLogo} />

        {renderSectionTitle(i18n.t("dp1"))}
        {renderParagraph(i18n.t("dp1Text"))}

        {renderSectionTitle(i18n.t("dp2"))}
        {renderParagraph(i18n.t("dp2Text"))}

        {renderSectionTitle(i18n.t("dp3"))}
        {renderParagraph(i18n.t("dp3Text"))}

        {renderSectionTitle(i18n.t("dp4"))}
        {renderParagraph(i18n.t("dp4Text"))}

        {renderSectionTitle(i18n.t("dp5"))}
        {renderParagraph(i18n.t("dp5Text"))}

        {renderSectionTitle(i18n.t("dp6"))}
        {renderParagraph(i18n.t("dp6Text"))}

        {renderSectionTitle(i18n.t("dp7"))}
        {renderParagraph(i18n.t("dp7Text"))}
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
