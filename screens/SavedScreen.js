import React, { useContext, useState } from "react";
import {
  View,
  Modal,
  Text,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { SavedContext } from "../data/SavedContext";
import { db, auth } from "../firebaseConfig";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";

const SavedScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;
  const navigation = useNavigation();

  const { collections, createCollection } = useContext(SavedContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCollectionForOptions, setSelectedCollectionForOptions] =
    useState(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);

  const handleCreateCollection = async () => {
    if (newCollectionName.trim()) {
      // Check for duplicate collection names
      const isDuplicate = collections.some(
        (collection) =>
          collection.title.toLowerCase() ===
          newCollectionName.trim().toLowerCase()
      );

      if (isDuplicate) {
        Alert.alert("Error", "A collection with this name already exists.");
        return;
      }

      try {
        setIsLoading(true); // Set loading state
        await createCollection(newCollectionName); // Call the helper function
        Alert.alert(
          "Success",
          `Collection "${newCollectionName}" created successfully!`
        );
        setNewCollectionName(""); // Clear input
        setIsModalVisible(false); // Close the modal
      } catch (error) {
        console.error("Error creating collection:", error);
        Alert.alert("Error", `Failed to create collection: ${error.message}`);
      }
    } else {
      Alert.alert("Error", "Please enter a valid collection name.");
    }
  };

  const deleteCollection = async (collectionId) => {
    try {
      const collectionRef = doc(
        db,
        "Users",
        auth.currentUser.uid,
        "userCollections",
        collectionId
      );
      await deleteDoc(collectionRef);

      // Update local state
      setSelectedCollection(null); // Deselect the collection if it's open
      Alert.alert("Success", "Collection deleted successfully.");
    } catch (error) {
      console.error("Error deleting collection:", error);
      Alert.alert("Error", `Failed to delete collection: ${error.message}`);
    }
  };

  const deleteItemFromCollection = async (collectionId, item) => {
    try {
      const collectionRef = doc(
        db,
        "Users",
        auth.currentUser.uid,
        "userCollections",
        collectionId
      );

      // Remove the item from Firestore using arrayRemove
      await updateDoc(collectionRef, {
        items: arrayRemove(item),
      });

      // Update local state
      setSelectedCollection((prevCollection) => ({
        ...prevCollection,
        items: prevCollection.items.filter((i) => i.id !== item.id),
      }));

      Alert.alert("Success", "Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", `Failed to delete item: ${error.message}`);
    }
  };

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => setSelectedCollection(item)} // Set the selected collection
    >
      <Text style={styles.collectionTitle}>{item.title}</Text>
      {item.items && item.items.length > 0 ? (
        <Image
          source={{ uri: item.items[0].photo }} // Show the first item's image
          style={styles.collectionImage}
        />
      ) : (
        <Icon name="images-outline" size={50} color="#ccc" />
      )}
      <TouchableOpacity
        style={styles.optionsIcon}
        onPress={() => {
          setSelectedCollectionForOptions(item);
          setIsOptionsModalVisible(true);
        }}
      >
        <Icon name="ellipsis-horizontal" size={20} color="#888" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSavedItem = ({ item }) => (
    <View style={styles.savedItem}>
      <Image source={{ uri: item.photo }} style={styles.savedItemImage} />
      <View style={styles.savedItemInfo}>
        <Text style={styles.savedItemName}>{item.name}</Text>
        <Text style={styles.savedItemAddress}>{item.address}</Text>
      </View>
      <TouchableOpacity
        onPress={() => deleteItemFromCollection(selectedCollection.id, item)}
      >
        <Icon name="trash-outline" size={20} color="#f00" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {selectedCollection ? (
          <TouchableOpacity
            onPress={() => setSelectedCollection(null)}
            style={styles.backButton}
          >
            <Icon
              name="arrow-back"
              size={24}
              color={theme === "light" ? "#000" : "#fff"}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon
              name="arrow-back"
              size={24}
              color={theme === "light" ? "#000" : "#fff"}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>
          {selectedCollection ? selectedCollection.title : "Saved Collections"}
        </Text>
      </View>

      {!selectedCollection && (
        <TouchableOpacity
          style={styles.createNewContainer}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.createNewText}>Create a New Collection</Text>
        </TouchableOpacity>
      )}

      {!selectedCollection ? (
        <FlatList
          key="collections"
          data={collections}
          renderItem={renderCollectionItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.collectionsList}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <FlatList
          key={`saved-items-${selectedCollection.id}`}
          data={selectedCollection.items}
          renderItem={renderSavedItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No items saved in this collection.
            </Text>
          }
        />
      )}

      {/* Modal for Creating New Collection */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Collection</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter collection name"
              placeholderTextColor="#999997"
              value={newCollectionName}
              onChangeText={setNewCollectionName}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Create" onPress={handleCreateCollection} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isOptionsModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity
              onPress={() => {
                deleteCollection(selectedCollectionForOptions.id);
                setIsOptionsModalVisible(false);
              }}
            >
              <Text style={styles.modalOption}>Delete Collection</Text>
            </TouchableOpacity>
            <Button
              title="Cancel"
              onPress={() => setIsOptionsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Light theme styles
const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdeae2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  collectionItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    elevation: 2,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 5,
  },
  collectionImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  optionsIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  createNewContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ab2264",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  createNewText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  savedItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  savedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  savedItemInfo: {
    justifyContent: "center",
  },
  savedItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  savedItemAddress: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
  collectionsList: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#545454",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  backButton: {
    position: "absolute",
    left: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  collectionItem: {
    flex: 1,
    backgroundColor: "#666",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    elevation: 2,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 5,
  },
  collectionImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  optionsIcon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  createNewContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ab2264",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  createNewText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  savedItem: {
    flexDirection: "row",
    backgroundColor: "#666",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  savedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  savedItemInfo: {
    justifyContent: "center",
  },
  savedItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  savedItemAddress: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#666",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#555",
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyText: {
    textAlign: "center",
    color: "#ccc",
    marginTop: 20,
    fontSize: 16,
  },
  collectionsList: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});

export default SavedScreen;
