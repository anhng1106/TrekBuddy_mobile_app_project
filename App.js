import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeProvider } from "./ThemeContext";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingScreen from "./screens/SettingScreen";
import SavedScreen from "./screens/SavedScreen";
import AboutPage from "./screens/About";
import { SavedProvider } from "./data/SavedContext";
import DataProtectionPolicyPage from "./screens/Data_Policy";
import { enableScreens } from "react-native-screens";

// Stack Navigator for screens outside bottom tabs
const Stack = createStackNavigator();
// Bottom Tab Navigator for HomeScreen tabs
const Tab = createBottomTabNavigator();

enableScreens();

// Bottom Tab Navigator component
function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size = 24 }) => {
          let iconName;
          if (route.name === "Explore") {
            iconName = "search";
          } else if (route.name === "Saved") {
            iconName = "heart";
          } else if (route.name === "Setting") {
            iconName = "settings";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fc8fa7",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Explore" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SavedProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ title: "TREKBUDDY - Sign In" }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{ title: "TREKBUDDY - Sign Up" }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeTabs} // Replace HomeScreen with HomeTabs
              options={{ title: "TREKBUDDY - Home", headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen} // Ensure ProfileScreen is here
              options={{ title: "TREKBUDDY - Profile" }}
            />
            <Stack.Screen
              name="AboutPage"
              component={AboutPage}
              options={{ title: "About" }}
            />
            <Stack.Screen
              name="DataProtectionPolicyPage"
              component={DataProtectionPolicyPage}
              options={{ title: "Data Protection Policy" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SavedProvider>
    </ThemeProvider>
  );
}

// Styles for placeholder screens
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
