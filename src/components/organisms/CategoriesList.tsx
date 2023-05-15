import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CategoryTypes } from '@interfaces/index';
import RCButton from '@atoms/RCButton';
import { TYPOGRAPHY_STYLES } from '@helpers/theme';
import uuid from 'react-native-uuid';

interface CategoriesListProps {
  optionSelected: string;
  dataCategories: CategoryTypes[];
  handleChangeOption: (value: string) => void;
}

const CategoriesList = ({
  dataCategories,
  handleChangeOption,
  optionSelected,
}: CategoriesListProps) => {
  const [currentCategory, setCurrentCategory] = useState<string>(optionSelected);

  const handleChangeCategory = (value: string) => {
    setCurrentCategory(value);
    handleChangeOption(value);
  };

  return (
    <View style={CategoriesListStyles.container}>
      <Text style={TYPOGRAPHY_STYLES.subtitle}>Categorías</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={[{ id: JSON.stringify(uuid.v4()), name: 'Todos' }, ...dataCategories]}
        contentContainerStyle={CategoriesListStyles.listCategoriesContainer}
        renderItem={({ item: category }) => (
          <RCButton
            type={currentCategory === category.name ? 'primaryButton' : 'quarteryButton'}
            text={category.name}
            onPress={() => handleChangeCategory(category.name)}
          />
        )}
      ></FlatList>
    </View>
  );
};

const CategoriesListStyles = StyleSheet.create({
  container: {
    gap: 20,
  },
  listCategoriesContainer: {
    gap: 20,
  },
});

export default CategoriesList;
