import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "./ThemeContext";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
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
            options={{ title: "TREKBUDDY - Sign Up" }} // Title displayed at the top of the sign-up screen
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ title: "Home" }}
          />
          {/* You will add more screens (Home, Profile, etc.) here */}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
