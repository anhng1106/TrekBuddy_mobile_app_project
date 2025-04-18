import * as React from "react";
import { useContext } from "react";
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
import i18n from "./utils/i18n";
import { LanguageProvider } from "./LanguageContext";
import { LanguageContext } from "./LanguageContext";
import QuizScreen from "./screens/QuizScreen";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

enableScreens();

// Bottom Tab Navigator component
function HomeTabs() {
  const { language } = useContext(LanguageContext);

  return (
    <Tab.Navigator
      key={language}
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
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{ tabBarLabel: i18n.t("explore") }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{ tabBarLabel: i18n.t("saved") }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ tabBarLabel: i18n.t("settings") }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: i18n.t("profile") }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
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
              <Stack.Screen
                name="QuizScreen"
                component={QuizScreen}
                options={{ title: "Quiz Game" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SavedProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
