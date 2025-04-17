import React, { createContext, useState, useEffect } from "react";
import i18n from "./utils/i18n";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18n.locale || "en");

  const changeLanguage = (lang) => {
    i18n.locale = lang;
    setLanguage(lang); // triggers re-render
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
