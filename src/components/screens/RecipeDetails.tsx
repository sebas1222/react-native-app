import React from 'react';
import RecipeDetailsTemplate from '@templates/RecipeDetailsTemplate';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@interfaces/index';
import { useQuery } from '@apollo/client';
import { GET_ONE_RECIPE } from '@api/queries';
import { Text, View } from 'react-native';
import RCLoadingIndicator from '@atoms/RCLoadingIndicator';

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
    return <RCLoadingIndicator />;
  }
  console.log(errorRecipe?.graphQLErrors[0].message);
  if (errorRecipe) {
    return (
      <View>
        <Text>{errorRecipe?.graphQLErrors[0].message}</Text>
      </View>
    );
  }
  return <RecipeDetailsTemplate dataRecipe={dataRecipe.findRecipe} />;
};

export default RecipeDetails;
