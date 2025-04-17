import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../ThemeContext";
import Icon from "react-native-vector-icons/Ionicons";
import i18n from "../utils/i18n"; // Adjust the import path as necessary

const SettingScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;

  const navigation = useNavigation();

  const [language, setLanguage] = useState(
    i18n.locale.startsWith("vi") ? "vi" : "en"
  );

  const toggleLanguage = () => {
    const newLang = language === "en" ? "vi" : "en";
    i18n.locale = newLang;
    setLanguage(newLang);
  };

  const settingsData = [
    {
      id: "1",
      icon: "shield-checkmark-outline",
      title: i18n.t("dataPolicy"),
      route: "DataProtectionPolicyPage",
    },
    {
      id: "2",
      icon: "information-circle-outline",
      title: i18n.t("about"),
      route: "AboutPage",
    },
    {
      id: "3",
      icon: "moon-outline",
      title: i18n.t("darkMode"),
      isToggle: true,
    },
    {
      id: "4",
      icon: "language-outline",
      title: i18n.t("switchToVietnamese"),
      isLanguageSwitch: true,
    },
  ];

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => {
        if (!item.isToggle && !item.isLanguageSwitch)
          navigation.navigate(item.route);
      }}
    >
      <Ionicons
        name={item.icon}
        size={28}
        color="#fc8fa7"
        style={styles.icon}
      />
      <Text style={styles.title}>{item.title}</Text>
      {item.isToggle ? (
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          style={styles.toggleSwitch}
        />
      ) : item.isLanguageSwitch ? (
        <Switch
          value={language === "vi"}
          onValueChange={toggleLanguage}
          style={styles.toggleSwitch}
        />
      ) : (
        <Ionicons
          name="chevron-forward-outline"
          size={16}
          color="#888"
          style={styles.arrow}
        />
      )}
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
        <Text style={styles.headerTitle}>{i18n.t("settings")}</Text>
      </View>
      <FlatList
        data={settingsData}
        renderItem={renderSettingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    left: 5, // Align to the left
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  listContainer: {
    paddingVertical: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
  },
  arrow: {
    marginLeft: 8,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  themeToggleText: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
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
    left: 5, // Align to the left
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  listContainer: {
    paddingVertical: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f9f9f9",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
  },
  arrow: {
    marginLeft: 8,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  themeToggleText: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
  },
});

export default SettingScreen;
