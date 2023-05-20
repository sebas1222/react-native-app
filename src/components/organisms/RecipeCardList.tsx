import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import RecipeCard from '@molecules/RecipeCard';
import { TYPOGRAPHY_STYLES } from '@helpers/theme';
import { RecipeTypes } from '@interfaces/index';

interface RecipeCardListProps {
  titleList: string;
  recipesData: RecipeTypes[]; //cambiar al tipo de dato del recipeItem de la Api
}

const RecipeCardList = ({ titleList, recipesData }: RecipeCardListProps) => {
  console.log(recipesData);
  return (
    <View style={RecipeCardListStyles.container}>
      <Text style={TYPOGRAPHY_STYLES.subtitle}>{titleList}</Text>
      <FlatList
        horizontal
        nestedScrollEnabled={true}
        contentContainerStyle={RecipeCardListStyles.container}
        data={recipesData}
        renderItem={({ item: recipe }) => <RecipeCard data={recipe} />}
      ></FlatList>
    </View>
  );
};

const RecipeCardListStyles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default React.memo(RecipeCardList);
