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
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { SavedContext } from "../data/SavedContext";

const SavedScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;
  const navigation = useNavigation();

  const { collections, createCollection } = useContext(SavedContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState(null);

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      createCollection(newCollectionName);
      alert(`Collection "${newCollectionName}" created successfully!`);
      setNewCollectionName("");
      setIsModalVisible(false); // Close the modal
    } else {
      alert("Please enter a valid collection name.");
    }
  };

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.collectionItem}
      onPress={() => setSelectedCollection(item)} // Set the selected collection
    >
      <Text style={styles.collectionTitle}>{item.title}</Text>
      <Icon
        name="ellipsis-horizontal"
        size={20}
        color="#888"
        style={styles.optionsIcon}
      />
    </TouchableOpacity>
  );

  const renderSavedItem = ({ item }) => (
    <View style={styles.savedItem}>
      <Image source={{ uri: item.photo }} style={styles.savedItemImage} />
      <View style={styles.savedItemInfo}>
        <Text style={styles.savedItemName}>{item.name}</Text>
        <Text style={styles.savedItemAddress}>{item.address}</Text>
      </View>
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
          onPress={() => setIsModalVisible(true)} // Opens the modal
        >
          <Text style={styles.createNewText}>Create New Collection</Text>
        </TouchableOpacity>
      )}

      {!selectedCollection ? (
        <FlatList
          key="collections"
          data={collections}
          renderItem={({ item }) => renderCollectionItem({ item })}
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
    backgroundColor: "#fdeae2",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5,
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
    elevation: 3,
  },
  createNewContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 10,
    paddingVertical: 25,
    width: "100%",
  },
  createNewText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  optionsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
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
  savedItemsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 30,
    marginTop: 15,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  savedItemsTextContainer: {
    flex: 1,
  },
  savedItemsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  savedItemsSubtitle: {
    color: "#888",
  },
  savedItemsImages: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 5,
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
  collectionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
  collectionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#000",
  },
  collectionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  folderIcon: {
    color: "#000",
  },
  collectionsList: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  collectionItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    elevation: 3,
  },
  createNewContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff78ad",
    borderRadius: 10,
    paddingVertical: 25,
    width: "100%",
  },
  createNewText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },
  collectionImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  optionsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  seeAllCollectionsButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
  seeAllCollectionsText: {
    color: "#ff8a8a",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
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
    backgroundColor: "#545454",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    position: "absolute",
    left: 5, // Align to the left
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  savedItemsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 15,
    marginTop: 15,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  savedItemsTextContainer: {
    flex: 1,
  },
  savedItemsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  savedItemsSubtitle: {
    color: "#888",
  },
  savedItemsImages: {
    flexDirection: "row",
    alignItems: "center",
  },
  savedImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginLeft: 5,
  },
  collectionsHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
  collectionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#fff",
  },
  collectionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  folderIcon: {
    color: "#fff",
  },
  collectionsList: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  collectionItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: "center",
    elevation: 3,
  },
  createNewContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 10,
    paddingVertical: 20,
    width: "80%",
  },
  createNewText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },
  collectionImage: {
    width: "100%",
    height: 80,
    borderRadius: 8,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#000",
  },
  optionsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  seeAllCollectionsButton: {
    alignSelf: "center",
    marginVertical: 10,
  },
  seeAllCollectionsText: {
    color: "#ff8a8a",
    fontWeight: "bold",
  },
});

export default SavedScreen;
