import {
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
  Dimensions,
} from "react-native";
import React, { memo, useRef, useState } from "react";
import data from "../organisms/datafake.json";
import { MAIN_COLORS } from "@helpers/theme";
const { width } = Dimensions.get("window");

const ImageSlider: React.FC<{ item: string; index: number }> = ({
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
        source={{ uri: item }}
        style={[ImageSliderStyles.image]}
      ></Image>
    </TouchableOpacity>
  );
};
interface RecipeImageSliderProps {
  dataImages: string[];
}
const RecipeImagesSlider = ({ dataImages }: RecipeImageSliderProps) => {
  const flatListRef = useRef<FlatList | null>(null);
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
        data={dataImages}
        renderItem={({ item: dataImage, index }) => (
          <ImageSlider item={dataImage} index={index} />
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
        // viewAreaCoveragePercentThreshold define qué porcentaje de un elemento debe estar visible para considerarse "visible" por FlatList
      ></FlatList>
      <View style={ImageSliderStyles.dotsContainer}>
        {dataImages &&
          dataImages.map((item, index) => {
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
