import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { TYPOGRAPHY_STYLES } from "@helpers/theme";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import RCButton from "@atoms/RCButton";
import RecipeImagesSlider from "@organisms/RecipeImagesSlider";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@interfaces/index";

const RecipeDetailsTemplate = () => {
  const [currentInfo, setCurrentInfo] = useState<string>("Ingredientes");
  const route = useRoute<RouteProp<RootStackParamList, "RecipeDetails">>();
  const { recipeData } = route.params;
  return (
    <View style={RecipeDetailsTemplateStyles.container}>
      <View style={RecipeDetailsTemplateStyles.sliderContainer}>
        <RecipeImagesSlider dataImages={recipeData?.images} />
      </View>
      <View style={{ flex: 0.6 }}>
        <ScrollView
          contentContainerStyle={
            RecipeDetailsTemplateStyles.bottomSheetContainer
          }
        >
          <View style={RecipeDetailsTemplateStyles.primaryInfoContainer}>
            <View style={RecipeDetailsTemplateStyles.topContainer}>
              <View style={{ flex: 1 }}>
                <Text style={TYPOGRAPHY_STYLES.title}>{recipeData.name}</Text>
              </View>
              <View style={RecipeDetailsTemplateStyles.timeContainer}>
                <FontAwesome5 name="clock" size={20} color="black" />
                <Text>{recipeData.duration} Min</Text>
              </View>
            </View>
            <View>
              <Text style={TYPOGRAPHY_STYLES.paragraph}>
                {recipeData.description}
              </Text>
            </View>
            <View style={{ gap: 10 }}>
              <View style={RecipeDetailsTemplateStyles.boxesContainer}>
                <View style={RecipeDetailsTemplateStyles.itemBoxContainer}>
                  <View style={RecipeDetailsTemplateStyles.itemNutritionalLogo}>
                    <AntDesign name="user" size={24} color="black" />
                  </View>
                  <View>
                    <Text>{recipeData.author?.name}</Text>
                  </View>
                </View>
                <View style={RecipeDetailsTemplateStyles.itemBoxContainer}>
                  <View style={RecipeDetailsTemplateStyles.itemNutritionalLogo}>
                    <AntDesign name="filter" size={24} color="black" />
                  </View>
                  <View>
                    <Text>{recipeData.category?.name}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={RecipeDetailsTemplateStyles.changeContainer}>
            <RCButton
              onPress={() => setCurrentInfo("Ingredientes")}
              text="Ingredientes"
              type={currentInfo === "Ingredientes" ? "primaryButton" : null}
              styles={{
                buttonStyles: {
                  paddingHorizontal: 30,
                  paddingVertical: 12,
                },
              }}
            />
            <RCButton
              onPress={() => setCurrentInfo("Preparación")}
              text="Preparación"
              type={currentInfo === "Preparación" ? "primaryButton" : null}
              styles={{
                buttonStyles: {
                  paddingHorizontal: 30,
                  paddingVertical: 12,
                },
              }}
            />
          </View>
          <View style={RecipeDetailsTemplateStyles.bottomInfo}>
            <Text style={TYPOGRAPHY_STYLES.subtitle}>
              {currentInfo === "Preparación" ? "Preparación" : "Ingredientes"}
            </Text>
            {currentInfo === "Preparación"
              ? recipeData.steps &&
                recipeData.steps.map((step, index) => {
                  return (
                    <Text key={index}>
                      {" "}
                      {step.step_number}- {step.description}
                    </Text>
                  );
                })
              : recipeData.ingredients &&
                recipeData.ingredients.map((ingredient, index) => {
                  return <Text key={index}>- {ingredient}</Text>;
                })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const RecipeDetailsTemplateStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    flex: 0.4,
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: "white",
    gap: 20,
  },
  primaryInfoContainer: {
    gap: 20,
  },
  topContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
    gap: 5,
  },
  boxesContainer: {
    flexDirection: "row",
  },
  itemBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.5,
    gap: 15,
  },
  itemNutritionalLogo: {
    backgroundColor: "#f3f3f3",
    padding: 10,
    borderRadius: 10,
  },
  bottomInfo: {
    gap: 10,
  },
  changeContainer: {
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    gap: 5,
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
  },
});

export default RecipeDetailsTemplate;
