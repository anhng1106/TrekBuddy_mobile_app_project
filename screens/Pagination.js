import { StyleSheet, View, Text } from "react-native";
import React from "react";

const Pagination = ({ items, paginationIndex, scrollX }) => {
  return (
    <View style={styles.container}>
      {items.map((_, index) => {
        return (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: paginationIndex === index ? "#222" : "#aaa" },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    backgroundColor: "#aaa",
    height: 8,
    width: 8,
    marginHorizontal: 2,
    borderRadius: 8,
  },
});
