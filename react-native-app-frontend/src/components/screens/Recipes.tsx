import React from "react";
import RecipesTemplate from "@templates/RecipesTemplate";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "@api/queries";
import { View, Text } from "react-native";

const Recipes = () => {
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
  return <RecipesTemplate categories={data.allCategories} />;
};

export default Recipes;
