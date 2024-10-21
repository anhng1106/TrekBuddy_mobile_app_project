import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen"; // Import your Login screen
import SignupScreen from "./screens/SignupScreen"; // Import your SignUp screen

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "TREKBUDDY - Sign In" }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignupScreen}
          options={{ title: "TREKBUDDY - Sign Up" }} // Title displayed at the top of the sign-up screen
        />
        {/* You will add more screens (Home, Profile, etc.) here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
