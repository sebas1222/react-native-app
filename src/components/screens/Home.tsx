import { GET_ALL_CATEGORIES, GET_ALL_RECIPES, GET_ONE_USER } from '@api/queries';
import { useQuery } from '@apollo/client';
import RCLoadingIndicator from '@atoms/RCLoadingIndicator';
import useGetCurrentUser from '@hooks/useGetCurrentUser';
import { useFocusEffect } from '@react-navigation/native';
import HomeTemplate from '@templates/HomeTemplate';
import React from 'react';
import { Text, View } from 'react-native';

const Home = () => {
  const currentUser = useGetCurrentUser();
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

  const {
    loading: loadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery(GET_ONE_USER, {
    variables: {
      idUser: currentUser._id,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  if (loadingRecipes || loadingCategories || loadingUser) {
    return <RCLoadingIndicator />;
  }

  if (errorRecipes || errorCategories || errorUser) {
    return (
      <View>
        <Text>{errorRecipes?.graphQLErrors[0].message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <HomeTemplate
        allRecipes={dataRecipes.allRecipes}
        allCategories={dataCategories.allCategories}
        dataCurrentUser={dataUser.findUser}
      />
    </View>
  );
};

export default Home;
