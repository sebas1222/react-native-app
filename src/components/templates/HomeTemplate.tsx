import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, ScrollView, Text, View } from 'react-native';
import CallToActionCard from '@molecules/CallToActionCard';
import HorizontalCard from '@molecules/HorizontalCard';
import { CategoryTypes, NavigationProps, RecipeTypes } from '@interfaces/index';
import CategoriesList from '@organisms/CategoriesList';
import { CONTAINER_STYLES, MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { useNavigation } from '@react-navigation/native';
import RecipeList from '@organisms/RecipeList';

interface HomeTemplateProps {
  allRecipes: RecipeTypes[];
  allCategories: CategoryTypes[];
}

const HomeTemplate = ({ allRecipes, allCategories }: HomeTemplateProps) => {
  const [categorySelected, setCategorySelected] = useState<string>('Todos');
  const navigation = useNavigation<NavigationProps['AddRecipe']>();

  return (
    <SafeAreaView style={CONTAINER_STYLES.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={HomeTemplateStyles.container}
      >
        <CallToActionCard
          description="¿Qué esperas? Crea y comparte tu receta con el mundo."
          backGroundColor={MAIN_COLORS.quartery}
          toAction={() => navigation.navigate('AddRecipe')}
          buttonType="primaryButton"
          icon={
            <MaterialCommunityIcons name="food-variant" size={54} color={MAIN_COLORS.primary} />
          }
        />
        <CategoriesList
          optionSelected={categorySelected}
          dataCategories={allCategories}
          handleChangeOption={(value) => setCategorySelected(value)}
        />
        <View style={HomeTemplateStyles.listRecipesContainer}>
          <Text style={TYPOGRAPHY_STYLES.subtitle}>Popular</Text>
          <RecipeList orientation="horizontal" dataRecipes={allRecipes} />
        </View>
        <HorizontalCard dataRecipe={allRecipes[0]} />
      </ScrollView>
    </SafeAreaView>
  );
};

const HomeTemplateStyles = StyleSheet.create({
  container: {
    gap: 20,
  },
  listRecipesContainer: {
    gap: 20,
  },
});

export default HomeTemplate;
