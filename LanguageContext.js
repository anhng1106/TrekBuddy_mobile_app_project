import React, { createContext, useState, useEffect } from "react";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./utils/i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale || "en");

  useEffect(() => {
    const loadStoredLanguage = async () => {
      const storedLang = await AsyncStorage.getItem("appLanguage");
      const detectedLang = Localization.locale?.startsWith("vi") ? "vi" : "en";

      const langToUse = storedLang || detectedLang;

      i18n.locale = langToUse;
      setLanguage(langToUse);
    };

    loadStoredLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    i18n.locale = lang;
    setLanguage(lang);
    await AsyncStorage.setItem("appLanguage", lang);
  };

  const toggleLanguage = () => {
    const newLang = language === "en" ? "vi" : "en";
    changeLanguage(newLang);
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
