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
import {
  doc,
  collection,
  deleteDoc,
  updateDoc,
  getDocs,
  arrayRemove,
} from "firebase/firestore";

const SavedScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;
  const navigation = useNavigation();

  const { collections, setCollections, createCollection } =
    useContext(SavedContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedCollectionForOptions, setSelectedCollectionForOptions] =
    useState(null);
  const [isItemDeleteModalVisible, setIsItemDeleteModalVisible] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

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
        await createCollection(newCollectionName);
        Alert.alert(
          "Success",
          `Collection "${newCollectionName}" created successfully!`
        );
        setNewCollectionName("");
        setIsModalVisible(false);
      } catch (error) {
        console.error("Error creating collection:", error);
        Alert.alert("Error", `Failed to create collection: ${error.message}`);
      }
    } else {
      Alert.alert("Error", "Please enter a valid collection name.");
    }
  };

  const openDeleteCollectionModal = (collection) => {
    setSelectedCollectionForOptions(collection);
    setIsDeleteModalVisible(true);
  };

  const fetchUserCollections = async () => {
    try {
      const userCollectionsRef = collection(
        db,
        "Users",
        auth.currentUser.uid,
        "userCollections"
      );
      const querySnapshot = await getDocs(userCollectionsRef);

      const collections = [];
      querySnapshot.forEach((doc) => {
        collections.push({ id: doc.id, ...doc.data() });
      });

      return collections;
    } catch (error) {
      console.error("Error fetching collections:", error);
      return [];
    }
  };

  const deleteCollection = async () => {
    if (!auth.currentUser) {
      Alert.alert("Error", "No user is signed in. Cannot delete collection.");
      return;
    }

    try {
      const collectionRef = doc(
        db,
        "Users",
        auth.currentUser.uid,
        "userCollections",
        selectedCollectionForOptions.id
      );
      await deleteDoc(collectionRef);

      const updatedCollections = await fetchUserCollections();
      setCollections(updatedCollections);
      Alert.alert(
        "Success",
        `Collection "${selectedCollectionForOptions.title}" deleted successfully.`
      );

      setIsDeleteModalVisible(false);
      setSelectedCollectionForOptions(null);
    } catch (error) {
      console.error("Error deleting collection:", error);
      Alert.alert("Error", `Failed to delete collection: ${error.message}`);
    }
  };

  const openDeleteItemModal = (item) => {
    setItemToDelete(item);
    setIsItemDeleteModalVisible(true);
  };

  const deleteItemFromCollection = async () => {
    try {
      const collectionRef = doc(
        db,
        "Users",
        auth.currentUser.uid,
        "userCollections",
        selectedCollection.id
      );

      await updateDoc(collectionRef, {
        items: arrayRemove(itemToDelete),
      });

      setSelectedCollection((prevCollection) => ({
        ...prevCollection,
        items: prevCollection.items.filter((i) => i.id !== itemToDelete.id),
      }));

      Alert.alert("Success", "Item deleted successfully.");
      setIsItemDeleteModalVisible(false);
      setItemToDelete(null);
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", `Failed to delete item: ${error.message}`);
    }
  };

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => setSelectedCollection(item)}
    >
      <Text style={styles.collectionTitle}>{item.title}</Text>
      {item.items && item.items.length > 0 ? (
        <Image
          source={{ uri: item.items[0].photo }}
          style={styles.collectionImage}
        />
      ) : (
        <Icon name="images-outline" size={50} color="#ccc" />
      )}
      <TouchableOpacity
        style={styles.optionsIcon}
        onPress={() => openDeleteCollectionModal(item)}
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
        style={styles.trashIconContainer}
        onPress={() => openDeleteItemModal(item)}
      >
        <Icon name="trash-outline" size={24} color="#f00" />
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
        <View style={styles.modalOverlay}>
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
              <TouchableOpacity
                style={styles.yesButton}
                title="Cancel"
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                title="Create"
                onPress={handleCreateCollection}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Collection Modal */}
      <Modal visible={isDeleteModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete{" "}
              <Text style={styles.collectionName}>
                {selectedCollectionForOptions?.title}
              </Text>
              ?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={deleteCollection}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Item Modal */}
      <Modal
        visible={isItemDeleteModalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete this item?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setIsItemDeleteModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.yesButton}
                onPress={deleteItemFromCollection}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    elevation: 2,
  },
  savedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  savedItemInfo: {
    flex: 1,
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
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  // modalContent: {
  //   backgroundColor: "#fff",
  //   padding: 20,
  //   borderRadius: 10,
  //   width: "80%",
  //   alignItems: "center",
  // },
  yesButton: {
    backgroundColor: "#d9534f",
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  noButton: {
    backgroundColor: "#5cb85c",
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  collectionName: {
    fontWeight: "bold",
    color: "#ab2264",
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
  trashIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
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
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    elevation: 2,
  },
  savedItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  savedItemInfo: {
    flex: 1,
  },
  savedItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  savedItemAddress: {
    fontSize: 14,
    color: "#000",
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
    color: "#00000",
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
    width: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  yesButton: {
    backgroundColor: "#d9534f",
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  noButton: {
    backgroundColor: "#5cb85c",
    flex: 1,
    margin: 5,
    paddingVertical: 10,
    borderRadius: 8,
  },
  collectionName: {
    fontWeight: "bold",
    color: "#ab2264",
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
  trashIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

export default SavedScreen;
