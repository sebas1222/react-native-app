import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { TYPOGRAPHY_STYLES } from "@helpers/theme";
import RCButton from "@atoms/RCButton";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProps } from "@interfaces/index";
import { useNavigation } from "@react-navigation/native";

const RecipeCard = () => {
  const navigation = useNavigation<NavigationProps["RecipeDetails"]>();
  return (
    <ImageBackground
      blurRadius={2}
      resizeMode="cover"
      style={RecipeCardStyles.recipeCardContainer}
      source={require("../../assets/recipe.jpg")}
    >
      <TouchableNativeFeedback
        onPress={() => navigation.navigate("RecipeDetails", { recipeId: 2 })}
      >
        <View style={RecipeCardStyles.imageMask}>
          <View style={RecipeCardStyles.imageFavButtonContainer}>
            <RCButton
              type="primaryButton"
              icon={<MaterialIcons name="favorite" size={24} color="white" />}
              onPress={() => console.log("Favorito añadido")}
            />
          </View> 
          <View style={RecipeCardStyles.imageLayoutContainer}>
            <Text
              numberOfLines={3}
              style={[TYPOGRAPHY_STYLES.title, { color: "white" }]}
            >
              Causa Limeña de pulpa de cangrejo
            </Text>
            <Text numberOfLines={1} style={{ color: "white", fontSize: 12 }}>
              5 ingredientes | 40min
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </ImageBackground>
  );
};

const RecipeCardStyles = StyleSheet.create({
  recipeCardContainer: {
    width: 250,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    aspectRatio: 1 / 1.6,
  },
  imageMask: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    padding: 15,
    right: 0,
    justifyContent: "space-between",
  },
  imageFavButtonContainer: {
    alignSelf: "flex-end",
  },
  imageLayoutContainer: { gap: 10 },
});

export default RecipeCard;
