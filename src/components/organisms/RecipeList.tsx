import { FlatList, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { NavigationProps, RecipeTypes } from '@interfaces/index';
import RecipeCard from '@molecules/RecipeCard';
import CallToActionCard from '@molecules/CallToActionCard';
import { MAIN_COLORS } from '@helpers/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface RecipeListProps {
  dataRecipes: RecipeTypes[];
  orientation: 'vertical' | 'horizontal';
}

const RecipeList = ({ dataRecipes, orientation }: RecipeListProps) => {
  const navigation = useNavigation<NavigationProps['Home']>();
  return orientation === 'vertical' ? (
    <FlatList
      data={dataRecipes}
      numColumns={2}
      contentContainerStyle={dataRecipes.length === 0 && RecipeListStyles.listEmptyData}
      ListEmptyComponent={
        <CallToActionCard
          description="No hay recetas que mostrar"
          icon={
            <MaterialCommunityIcons name="food-variant" size={54} color={MAIN_COLORS.tertiary} />
          }
          buttonText="Explorar recetas"
          toAction={() => navigation.navigate('Home')}
        />
      }
      renderItem={({ item: recipe }) => (
        <View style={{ flex: 0.5, padding: 5 }}>
          <RecipeCard data={recipe} />
        </View>
      )}
    />
  ) : (
    <FlatList
      horizontal
      data={dataRecipes}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20 }}
      ListEmptyComponent={
        <CallToActionCard
          description="No hay recetas que mostrar"
          icon={
            <MaterialCommunityIcons name="food-variant" size={54} color={MAIN_COLORS.tertiary} />
          }
          buttonText="Explorar recetas"
          toAction={() => navigation.navigate('Home')}
        />
      }
      renderItem={({ item: recipe }) => (
        <View style={{ width: 250 }}>
          <RecipeCard data={recipe} />
        </View>
      )}
    />
  );
};

const RecipeListStyles = StyleSheet.create({
  listEmptyData: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default memo(RecipeList);
