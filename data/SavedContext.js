import React, { createContext, useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

export const SavedContext = createContext();

export const SavedProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);

  // Function to fetch user collections
  const fetchUserCollections = async () => {
    if (!auth.currentUser) {
      console.error("No user is signed in.");
      return []; // Return an empty array if no user is signed in
    }

    const userId = auth.currentUser.uid; // Get the current user's uid
    console.log("auth object:", auth);
    console.log("auth.currentUser:", auth.currentUser);
    console.log("User ID:", userId);

    try {
      // Get the user's sub-collection (userCollections) from Firestore
      const userCollectionsRef = collection(
        db,
        "Users",
        userId,
        "userCollections"
      );
      const querySnapshot = await getDocs(userCollectionsRef);

      const userCollections = [];
      querySnapshot.forEach((doc) => {
        userCollections.push({ id: doc.id, ...doc.data() });
      });

      console.log("User collections:", userCollections);
      return userCollections; // Return collections for the user
    } catch (error) {
      console.error("Error fetching user collections:", error);
      throw error;
    }
  };

  // Initialize collections when user state changes
  const initializeCollections = async () => {
    try {
      const userCollections = await fetchUserCollections();
      setCollections(userCollections);
    } catch (error) {
      console.error("Error initializing collections:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User signed in:", user);
        initializeCollections();
      } else {
        console.log("No user signed in.");
        setCollections([]); // Reset collections if no user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  // Function to create a new collection
  const createCollection = async (name) => {
    if (!auth.currentUser) {
      console.error("No user is signed in. Cannot create collection.");
      return;
    }

    const userId = auth.currentUser.uid;
    const newCollection = {
      title: name, // Collection name
      items: [], // Initial empty items array
    };

    try {
      // Add the collection to the user's sub-collection in Firestore
      const userCollectionsRef = collection(
        db,
        "Users",
        userId,
        "userCollections"
      );
      const docRef = await addDoc(userCollectionsRef, newCollection);
      console.log("Collection added with ID:", docRef.id);

      // Update local state
      setCollections((prevCollections) => [
        ...prevCollections,
        { id: docRef.id, ...newCollection },
      ]);
    } catch (error) {
      console.error("Error creating collection:", error);
      throw error;
    }
  };

  // Function to save an item to a collection
  const saveItemToCollection = async (collectionId, item) => {
    if (!auth.currentUser) {
      console.error("No user is signed in. Cannot save item.");
      return;
    }

    const userId = auth.currentUser.uid;

    try {
      const userCollectionsRef = doc(
        db,
        "Users",
        userId,
        "userCollections",
        collectionId
      );

      // Update the collection's items field (you can use an update function here if needed)
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

      console.log("Item saved to collection:", collectionId);
    } catch (error) {
      console.error("Error saving item to collection:", error);
      throw error;
    }
  };

  return (
    <SavedContext.Provider
      value={{
        collections,
        createCollection,
        saveItemToCollection,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
};
