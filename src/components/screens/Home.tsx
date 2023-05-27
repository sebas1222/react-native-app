import { GET_ALL_CATEGORIES, GET_ALL_RECIPES } from '@api/queries';
import { useQuery } from '@apollo/client';
import RCLoadingIndicator from '@atoms/RCLoadingIndicator';
import Layout from '@molecules/Layout';
import { useFocusEffect } from '@react-navigation/native';
import HomeTemplate from '@templates/HomeTemplate';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
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

  if (loadingRecipes || loadingCategories) {
    return <RCLoadingIndicator />;
  }
  console.log(dataRecipes)
  console.log(errorRecipes)
  console.log(errorCategories)
  if (errorRecipes || errorCategories) {
    return (
      <View>
        <Text>{JSON.stringify({ ...errorCategories, ...errorRecipes })}</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Layout/>
      <HomeTemplate
        allRecipes={dataRecipes.allRecipes}
        allCategories={dataCategories.allCategories}
      />
    </View>
  );
};

export default Home;
