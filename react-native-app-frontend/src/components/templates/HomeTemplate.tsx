import RCButton from "@atoms/RCButton";
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from "@helpers/theme";
import RecipeCardList from "@organisms/RecipeCardList";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CallToActionCard from "@molecules/CallToActionCard";
import HorizontalCard from "@molecules/HorizontalCard";

const HomeTemplate = () => {
  return (
    <ScrollView contentContainerStyle={HomeTemplateStyles.container}>
      <CallToActionCard
        action="¿Qué esperas? Crea y comparte tu receta con el mundo."
        toAction={() => console.log("Ir a recetas")}
        buttonType="primaryButton"
        icon={
          <MaterialCommunityIcons name="food-variant" size={54} color="white" />
        }
      />
      <View style={HomeTemplateStyles.categoriesContainer}>
        <Text style={TYPOGRAPHY_STYLES.subtitle}>Categorías</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{ gap: 20 }}
        >
          <RCButton
            type="tertiaryButton"
            text="Todo"
            onPress={() => console.log("category")}
          />
          <RCButton
            type="quarteryButton"
            text="Vegetariana"
            onPress={() => console.log("category")}
          />
          <RCButton
            type="quarteryButton"
            text="Carne"
            onPress={() => console.log("category")}
          />
          <RCButton
            type="quarteryButton"
            text="Pastas"
            onPress={() => console.log("category")}
          />
          <RCButton
            type="quarteryButton"
            text="Marina"
            onPress={() => console.log("category")}
          />
          <RCButton
            type="quarteryButton"
            text="Frituras"
            onPress={() => console.log("category")}
          />
        </ScrollView>
      </View>

      <RecipeCardList titleList="Popular" />
      <RecipeCardList titleList="Para tí" />
      <HorizontalCard 
        toAction={() => console.log("Ir a recetas")}
        autor="Paco Jimenez"
        foodName="Hamburguesa"
        foodType="Fritura"
        icon={<Image
          source={require(`../../assets/Hamburguer.png`)}
      />}
      />
     <HorizontalCard 
        toAction={() => console.log("Ir a recetas")}
        autor="Paco Jimenez"
        foodName="Hamburguesa"
        foodType="Fritura"
        icon={<Image
          source={require(`../../assets/Hamburguer.png`)}
      />}
      />
      <HorizontalCard 
        toAction={() => console.log("Ir a recetas")}
        autor="Paco Jimenez"
        foodName="Hamburguesa"
        foodType="Fritura"
        icon={<Image
          source={require(`../../assets/Hamburguer.png`)}
      />}
      />
      <HorizontalCard 
        toAction={() => console.log("Ir a recetas")}
        autor="Paco Jimenez"
        foodName="Hamburguesa"
        foodType="Fritura"
        icon={<Image
          source={require(`../../assets/Hamburguer.png`)}
      />}
      />
    </ScrollView>
  );
};

const HomeTemplateStyles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  categoriesContainer: {
    gap: 20,
  },
  callToCreateContainer: {
    flexDirection: "row",
    backgroundColor: MAIN_COLORS.tertiary,
    padding: 20,
    gap: 20,
    alignItems: "center",
    borderRadius: 10,
  },
  callToCreateLayout: {
    flex: 1,
    gap: 10,
  },
});

export default HomeTemplate;
