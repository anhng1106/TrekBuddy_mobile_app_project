import React, { createContext, useState } from "react";

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  const createCollection = (name) => {
    const newCollection = {
      id: Date.now().toString(),
      title: name,
      items: [],
    };
    setCollections((prevCollections) => [...prevCollections, newCollection]);
  };

  const saveItemToCollection = (collectionId, item) => {
    setCollections((prevCollections) =>
      prevCollections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              items: [...collection.items, item], // Add the item to the collection's items array
            }
          : collection
      )
    );
  };

  return (
    <SavedContext.Provider
      value={{ collections, createCollection, saveItemToCollection }}
    >
      {children}
    </SavedContext.Provider>
  );
};
