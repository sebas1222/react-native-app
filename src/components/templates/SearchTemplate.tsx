import { Text, StyleSheet, SafeAreaView, View } from 'react-native';
import React, { useState } from 'react';
import { CONTAINER_STYLES, MAIN_COLORS } from '@helpers/theme';
import RCTextInput from '@atoms/RCTextInput';
import SelectContainer from '@molecules/SelectContainer';
import { CategoryTypes, RecipeTypes } from '@interfaces/index';
import RCButton from '@atoms/RCButton';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import RecipeList from '@organisms/RecipeList';
import { intersectionArrays } from '@helpers/functions';

interface SearchTemplateProps {
  recipesData: RecipeTypes[];
  categoriesData: CategoryTypes[];
}

const SearchTemplate = ({ recipesData, categoriesData }: SearchTemplateProps) => {
  //El query es el valor del input a escribir
  const [query, setQuery] = useState<string>('');
  // El currentcategory es la categoria seleccionada por el usuario para el filtrado
  const [currentCategory, setCurrentCategory] = useState<string>('');
  //El modal categories simplemente servira para llamar a renderizar el selectcontainer que contendra
  // la lista de categorias para que el usuario pueda seleccionar el que desee para filtrar
  const [modalCategories, setModalCategories] = useState<boolean>(false);
  // El currentduration es el valor de la duración para el filtrado, se mostrara las recetas que
  // tengan igual o menor valor que este
  const [currentDuration, setCurrentDuration] = useState<number>(120);

  //logica para obtener el filtrado de recetas mediante el query
  const recipesByQuery = (): RecipeTypes[] => {
    if (query) {
      const recipesByQuery = recipesData.filter((recipe) =>
        recipe.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
      return recipesByQuery;
    } else {
      return recipesData;
    }
  };

  // logica para obtener el filtrado de recetas por categoría
  const recipesByCategory = (): RecipeTypes[] => {
    if (currentCategory) {
      const recipesByCategory = recipesData.filter(
        (recipe) => recipe.category.name === currentCategory
      );
      return recipesByCategory;
    } else {
      return recipesData;
    }
  };

  //logica para obtener el filtrado por duración
  const recipesByDuration = (): RecipeTypes[] => {
    if (currentDuration) {
      const recipesByDuration = recipesData.filter((recipe) => recipe.duration <= currentDuration);
      return recipesByDuration;
    } else {
      return recipesData;
    }
  };

  //finalmente  se hará una intersección entre estos arrays para obtener las recetas que cumplan
  //todos los filtrados

  return (
    <SafeAreaView style={[CONTAINER_STYLES.mainContainer, SearchTemplateStyles.mainContainer]}>
      {/*Aca añade tu codigo Will*/}
      <RCTextInput
        icon={<Feather name="search" size={24} color="black" />}
        value={query}
        placeholder="¿Qué se te antoja hoy?"
        styles={{
          flexDirection: 'row-reverse',
          backgroundColor: MAIN_COLORS.quartery,
          borderColor: MAIN_COLORS.tertiary,
        }}
        onChangeText={(value) => setQuery(value)}
      />
      <View>
        <Text>Duración en (mins) : {currentDuration}</Text>
        <Slider
          value={currentDuration}
          onValueChange={(value) => setCurrentDuration(Math.trunc(value))}
          style={{ height: 50 }}
          thumbTintColor={MAIN_COLORS.primary}
          minimumValue={15}
          maximumValue={120}
          minimumTrackTintColor={MAIN_COLORS.primary}
          maximumTrackTintColor="#000000"
        />
      </View>
      <RCButton
        icon={<MaterialIcons name="keyboard-arrow-down" size={24} color={MAIN_COLORS.quartery} />}
        text={currentCategory ? currentCategory : 'Filtrar por categoría'}
        onPress={() => setModalCategories(true)}
        type="primaryButton"
      />
      <Text>Resultados de la busqueda:</Text>
      <SelectContainer
        data={categoriesData?.map((category) => ({
          id: category.id,
          value: category.name,
          valueLabel: category.name,
        }))}
        value={currentCategory}
        handleChangeData={(value) => setCurrentCategory(value)}
        title="Filtrar por categoría:"
        defaultLabel="Todas las categorias"
        visible={modalCategories}
        onClose={() => setModalCategories(false)}
      />
      <RecipeList
        orientation="vertical"
        dataRecipes={intersectionArrays([
          recipesByCategory(),
          recipesByDuration(),
          recipesByQuery(),
        ])}
      ></RecipeList>
    </SafeAreaView>
  );
};

const SearchTemplateStyles = StyleSheet.create({
  mainContainer: {
    gap: 15,
  },
});

export default SearchTemplate;
