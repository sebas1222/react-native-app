import React from 'react';
import RecipeDetailsModal from '@organisms/RecipeDetailsModal';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RecipeTypes } from '@interfaces/index';

interface RecipeDetailsTemplateProps {
  dataRecipe: RecipeTypes;
}

const RecipeDetailsTemplate = ({ dataRecipe }: RecipeDetailsTemplateProps) => {
  return (
    <SafeAreaView style={[RecipeDetailsTemplateStyles.mainContainer]}>
      <RecipeDetailsModal dataRecipe={dataRecipe} />
    </SafeAreaView>
  );
};

const RecipeDetailsTemplateStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

export default RecipeDetailsTemplate;
