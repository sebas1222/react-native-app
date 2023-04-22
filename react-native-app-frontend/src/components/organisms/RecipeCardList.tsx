import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import RecipeCard from "@molecules/RecipeCard";
import RCSeparator from "@atoms/RCSeparator";
import { TYPOGRAPHY_STYLES } from "@helpers/theme";

interface RecipeCardListProps {
  titleList: string;
  recipesData?: any; //cambiar al tipo de dato del recipeItem de la Api
}

const RecipeCardList = ({ titleList, recipesData }: RecipeCardListProps) => {
  return (
    <View style={RecipeCardListStyles.container}>
      <Text style={TYPOGRAPHY_STYLES.subtitle}>{titleList}</Text>
      <ScrollView horizontal contentContainerStyle={{ gap: 20 }}>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </ScrollView>
    </View>
  );
};

const RecipeCardListStyles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default React.memo(RecipeCardList);
