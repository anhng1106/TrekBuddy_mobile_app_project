import { StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { ImageSlider } from "../data/SliderData";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Pagination from "./Pagination";

const Slider = ({ itemList }) => {
  const scrollX = useSharedValue(0);
  const [paginationIndex, setPaginationIndex] = useState(1);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (
      viewableItems[0] &&
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      setPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig,
      onViewableItemsChanged,
    },
  ]);

  return (
    <View>
      <Animated.FlatList
        data={itemList}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.id.toString()} // Ensure key is a string
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Pagination
        items={itemList}
        scrollX={scrollX}
        paginationIndex={paginationIndex}
      />
    </View>
  );
};

export default Slider;
