import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import React from "react";
import { ImageSlider } from "../data/SliderData";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const SliderItem = React.memo(({ item, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          [(index - 1) * width, index * width, (index + 1) * width],
          [-width * 0.25, 0, width * 0.25],
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
  }));

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Image source={item.image} style={styles.image} />
    </Animated.View>
  );
});

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width,
    gap: 20,
  },
  image: {
    width: 300,
    height: 500,
    borderRadius: 15,
  },
});
