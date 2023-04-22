import {
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import React, { memo, useRef, useState } from "react";
import data from "../organisms/datafake.json";
import { MAIN_COLORS } from "@helpers/theme";
const { width } = Dimensions.get("window");

interface ImageSliderItemProps {
  title: string;
  url: string;
}

const ImageSlider: React.FC<{ item: ImageSliderItemProps; index: number }> = ({
  item,
  index,
}) => {
  //evaluar luego

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => console.log("clicked")}
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.url }}
        style={[ImageSliderStyles.image]}
      ></Image>
    </TouchableOpacity>
  );
};

const RecipeImagesSlider = () => {
  const flatListRef = useRef<FlatList<ImageSliderItemProps> | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleScroll = (index: number) => {
    flatListRef.current?.scrollToIndex({ index: index, animated: true });
  };
  const onViewRef = useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      console.log(info);
      if (info.changed[0].isViewable) {
        setCurrentIndex(info.viewableItems[0].index || 0);
      }
    }
  );

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => (flatListRef.current = ref)}
        horizontal
        data={data}
        renderItem={ImageSlider}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        // viewAreaCoveragePercentThreshold define qué porcentaje de un elemento debe estar visible para considerarse "visible" por FlatList
      ></FlatList>
      <View style={ImageSliderStyles.dotsContainer}>
        {data &&
          data.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() => handleScroll(index)}
              >
                <View
                  style={
                    currentIndex === index
                      ? [
                          ImageSliderStyles.dotItemContainer,
                          ImageSliderStyles.dotItemContainerSelected,
                        ]
                      : ImageSliderStyles.dotItemContainer
                  }
                ></View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

const ImageSliderStyles = StyleSheet.create({
  image: {
    height: "100%",
    width,
  },
  dotsContainer: {
    position: "absolute",
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
    bottom: 10,
  },
  dotItemContainer: {
    width: 15,
    aspectRatio: 1,
    borderRadius: 999,
    backgroundColor: MAIN_COLORS.tertiary,
  },
  dotItemContainerSelected: {
    backgroundColor: MAIN_COLORS.primary,
  },
});

export default memo(RecipeImagesSlider);
