import React from 'react';
import RecipeDetailsTemplate from '@templates/RecipeDetailsTemplate';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@interfaces/index';
import { useQuery } from '@apollo/client';
import { GET_ONE_RECIPE } from '@api/queries';
import { Text, View } from 'react-native';

const RecipeDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipeDetails'>>();
  const { recipeId } = route.params;
  console.log({ recipeId });
  const {
    loading: loadingRecipe,
    error: errorRecipe,
    data: dataRecipe,
  } = useQuery(GET_ONE_RECIPE, { variables: { idRecipe: recipeId } });

  if (loadingRecipe) {
    return (
      <View>
        <Text>Loading....</Text>
      </View>
    );
  }
  if (errorRecipe) {
    return (
      <View>
        <Text>{JSON.stringify(errorRecipe)}</Text>
      </View>
    );
  }
  return <RecipeDetailsTemplate dataRecipe={dataRecipe.findRecipe} />;
};

export default RecipeDetails;
