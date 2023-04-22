import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { TYPOGRAPHY_STYLES } from "@helpers/theme";
import { FontAwesome5 } from "@expo/vector-icons";
import RCButton from "@atoms/RCButton";
import RecipeImagesSlider from "@organisms/RecipeImagesSlider";

const RecipeDetailsTemplate = () => {
  const [currentInfo, setCurrentInfo] = useState<string>("Ingredientes");
  return (
    <View style={RecipeDetailsTemplateStyles.container}>
      <View style={RecipeDetailsTemplateStyles.sliderContainer}>
        <RecipeImagesSlider />
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
                <Text style={TYPOGRAPHY_STYLES.title}>Healthy Taco Salad</Text>
              </View>
              <View style={RecipeDetailsTemplateStyles.timeContainer}>
                <FontAwesome5 name="clock" size={20} color="black" />
                <Text>15 Min</Text>
              </View>
            </View>
            <View>
              <Text style={TYPOGRAPHY_STYLES.paragraph}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                Dignissimos veritatis totam voluptates dolorem enim eveniet
                iusto illo rerum fuga.
              </Text>
            </View>
            <View style={{ gap: 10 }}>
              <View
                style={RecipeDetailsTemplateStyles.nutritionalInfoContainer}
              >
                <View
                  style={RecipeDetailsTemplateStyles.itemNutritionalContainer}
                >
                  <View style={RecipeDetailsTemplateStyles.itemNutritionalLogo}>
                    <FontAwesome5 name="clock" size={20} color="grey" />
                  </View>
                  <View>
                    <Text>70g carbs</Text>
                  </View>
                </View>
                <View
                  style={RecipeDetailsTemplateStyles.itemNutritionalContainer}
                >
                  <View style={RecipeDetailsTemplateStyles.itemNutritionalLogo}>
                    <FontAwesome5 name="clock" size={20} color="grey" />
                  </View>
                  <View>
                    <Text>65g carbs</Text>
                  </View>
                </View>
              </View>
              <View
                style={RecipeDetailsTemplateStyles.nutritionalInfoContainer}
              >
                <View
                  style={RecipeDetailsTemplateStyles.itemNutritionalContainer}
                >
                  <View style={RecipeDetailsTemplateStyles.itemNutritionalLogo}>
                    <FontAwesome5 name="clock" size={20} color="grey" />
                  </View>
                  <View>
                    <Text>70g carbs</Text>
                  </View>
                </View>
                <View
                  style={RecipeDetailsTemplateStyles.itemNutritionalContainer}
                >
                  <View style={RecipeDetailsTemplateStyles.itemNutritionalLogo}>
                    <FontAwesome5 name="clock" size={20} color="grey" />
                  </View>
                  <View>
                    <Text>65g carbs</Text>
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
          <View>
            <Text style={TYPOGRAPHY_STYLES.subtitle}>
              {currentInfo === "Preparación" ? "Preparación" : "Ingredientes"}
            </Text>
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
  nutritionalInfoContainer: {
    flexDirection: "row",
  },
  itemNutritionalContainer: {
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
