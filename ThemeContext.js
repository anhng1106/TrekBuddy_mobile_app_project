import React, { createContext, useState } from "react";
import { useColorScheme } from "react-native";

// Create context
export const ThemeContext = createContext();

// Create provider component
export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Detect system theme
  const [theme, setTheme] = useState(systemTheme || "light"); // Default to light theme if undefined

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
