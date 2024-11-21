import React, { createContext, useState } from "react";

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [collections, setCollections] = useState([]); // State for collections

  const saveItem = (item) => {
    setSavedItems((prevItems) => [...prevItems, item]);
  };

  const createCollection = (name) => {
    setCollections((prevCollections) => [
      ...prevCollections,
      { id: Date.now().toString(), title: name, items: [] },
    ]);
  };

  return (
    <SavedContext.Provider
      value={{ savedItems, saveItem, collections, createCollection }}
    >
      {children}
    </SavedContext.Provider>
  );
};
