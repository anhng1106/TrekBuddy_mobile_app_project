import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SettingScreen = () => {
  const navigation = useNavigation();

  const settingsData = [
    {
      id: "1",
      icon: "shield-checkmark-outline",
      title: "Data Protection Policy",
      route: "DataProtectionPolicy",
    },
    {
      id: "2",
      icon: "information-circle-outline",
      title: "About",
      route: "About",
    },
  ];

  const renderSettingItem = ({ item }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate(item.route)}
    >
      <Ionicons name={item.icon} size={28} color="blue" style={styles.icon} />
      <Text style={styles.title}>{item.title}</Text>
      <Ionicons
        name="chevron-forward-outline"
        size={16}
        color="#888"
        style={styles.arrow}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
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
});

export default SettingScreen;
