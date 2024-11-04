import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import React from "react";
import { ImageSlider } from "../data/SliderData";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const SliderItem = ({ item, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.2, 0, width * 0.1],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Image source={item.image} style={styles.image} />
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    marginHorizontal: 5,
  },
  image: {
    width: 300,
    height: 500,
    borderRadius: 15,
  },
});
