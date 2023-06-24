import React from 'react';
import SearchTemplate from '@templates/SearchTemplate';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES, GET_ALL_RECIPES } from '@api/queries';
import { Text, View } from 'react-native';
import RCLoadingIndicator from '@atoms/RCLoadingIndicator';
import { useFocusEffect } from '@react-navigation/native';

const Search = () => {
  // Se hace los llamados al back desplegado con GraphQL mediante querys de apollo client
  const {
    loading: loadingRecipes,
    error: errorRecipes,
    data: dataRecipes,
    refetch,
  } = useQuery(GET_ALL_RECIPES);
  const {
    loading: loadingCategories,
    error: errorCategories,
    data: dataCategories,
  } = useQuery(GET_ALL_CATEGORIES);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  //Se espera a que se termine de hacer los llamados
  //mientras tanto se muestra un indicador de carga
  if (loadingRecipes || loadingCategories) {
    return <RCLoadingIndicator />;
  }
  //Si hay un error tanto al llamar las recetas como las categorias se va a mostrar el error
  // mas crucial en este caso mostraremos el mensaje de error que se trae del back
  if (errorRecipes || errorCategories) {
    return (
      <View>
        <Text>{errorRecipes?.graphQLErrors[0].message}</Text>
      </View>
    );
  }
  // Si es que se ha terminado de hacer las peticiones y no se ha encontrado errores entonces
  // Se procede a pasar mediante props la data obtenida

  return (
    <SearchTemplate
      recipesData={dataRecipes.allRecipes}
      categoriesData={dataCategories.allCategories}
    />
  );
};

export default Search;
