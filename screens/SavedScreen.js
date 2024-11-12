import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ThemeContext } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";

const SavedScreen = () => {
  const { theme } = useContext(ThemeContext);
  const styles = theme === "light" ? lightTheme : darkTheme;
  const navigation = useNavigation();

  const collections = [
    { id: "1", title: "Create New Collection", isCreateNew: true },
    { id: "2", title: "Helsinki", image: require("../assets/helsinki.jpg") },
    { id: "3", title: "Bangkok", image: require("../assets/bangkok.jpg") },
  ];

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity style={styles.collectionItem}>
      {item.isCreateNew ? (
        <View style={styles.createNewContainer}>
          <Icon name="add" size={24} color="#fff" />
          <Text style={styles.createNewText}>{item.title}</Text>
        </View>
      ) : (
        <>
          <Image source={item.image} style={styles.collectionImage} />
          <Text style={styles.collectionTitle}>{item.title}</Text>
          <Icon
            name="ellipsis-horizontal"
            size={20}
            color="#888"
            style={styles.optionsIcon}
          />
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
        <Text style={styles.headerTitle}>Saved Collection</Text>
      </View>

      {/* Saved Items Card */}
      <TouchableOpacity style={styles.savedItemsCard}>
        <View style={styles.savedItemsTextContainer}>
          <Text style={styles.savedItemsTitle}>See All Saved Items</Text>
          <Text style={styles.savedItemsSubtitle}>Saved Items</Text>
        </View>
        <View style={styles.savedItemsImages}>
          <Image
            source={require("../assets/image1.jpg")}
            style={styles.savedImage}
          />
          <Image
            source={require("../assets/image2.jpg")}
            style={styles.savedImage}
          />
          <Image
            source={require("../assets/image3.jpg")}
            style={styles.savedImage}
          />
        </View>
      </TouchableOpacity>

      {/* Collections Section */}
      <View style={styles.collectionsHeader}>
        <Icon name="folder-outline" size={24} style={styles.folderIcon} />
        <Text style={styles.collectionsTitle}>Collections</Text>
      </View>

      {/* Collections Card to unify collections */}
      <View style={styles.collectionsContainer}>
        <FlatList
          data={collections}
          renderItem={renderCollectionItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.collectionsList}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>

      {/* See All Collections */}
      <TouchableOpacity style={styles.seeAllCollectionsButton}>
        <Text style={styles.seeAllCollectionsText}>See All Collections</Text>
      </TouchableOpacity>
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
});

export default SavedScreen;
