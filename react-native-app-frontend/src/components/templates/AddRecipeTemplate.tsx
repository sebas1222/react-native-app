import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import AddRecipeProcess from '@organisms/AddRecipeProcess';
import { CategoryTypes } from '@interfaces/index';
import { CONTAINER_STYLES } from '@helpers/theme';
interface RecipeTemplateProps {
  categories: CategoryTypes[];
}

const AddRecipeTemplate = ({ categories }: RecipeTemplateProps) => {
  return (
    <SafeAreaView style={[CONTAINER_STYLES.mainContainer, AddRecipeTemplateSyles.mainContainer]}>
      <ScrollView contentContainerStyle={AddRecipeTemplateSyles.container}>
        <AddRecipeProcess categories={categories} />
      </ScrollView>
    </SafeAreaView>
  );
};

const AddRecipeTemplateSyles = StyleSheet.create({
  mainContainer: {},
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default AddRecipeTemplate;
