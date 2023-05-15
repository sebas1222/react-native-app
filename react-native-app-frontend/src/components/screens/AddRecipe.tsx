import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from '@api/queries';
import { View, Text } from 'react-native';
import AddRecipeTemplate from '@templates/AddRecipeTemplate';

const AddRecipe = () => {
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }
  return <AddRecipeTemplate categories={data.allCategories} />;
};

export default AddRecipe;
