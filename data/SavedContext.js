import React, { createContext, useState } from "react";

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);

  const saveItem = (item) => {
    setSavedItems((prevItems) => [...prevItems, item]);
  };

  return (
    <SavedContext.Provider value={{ savedItems, saveItem }}>
      {children}
    </SavedContext.Provider>
  );
};
