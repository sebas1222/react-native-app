import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ONE_USER, GET_USER_RECIPES } from '@api/queries';
import { Text, View } from 'react-native';
import UserPerfilTemplate from '@templates/UserPerfilTemplate';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@interfaces/index';
import RCLoadingIndicator from '@atoms/RCLoadingIndicator';

const UserPerfil = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'UserPerfil'>>();
  const { userId } = route.params;
  const {
    loading: loadingRecipes,
    error: errorRecipes,
    data: dataRecipes,
    refetch: refetchRecipes,
  } = useQuery(GET_USER_RECIPES, { variables: { idUser: userId } });
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    data: dataUserInfo,
    refetch: refetchUserInfo,
  } = useQuery(GET_ONE_USER, { variables: { idUser: userId } });

  useEffect(() => {
    refetchRecipes();
    refetchUserInfo();
  }, [userId]);

  if (loadingRecipes || loadingUserInfo) {
    return <RCLoadingIndicator />;
  }
  if (errorRecipes || errorUserInfo) {
    return (
      <View>
        <Text>{JSON.stringify({ ...errorRecipes, ...errorUserInfo })}</Text>
      </View>
    );
  }

  return (
    <UserPerfilTemplate dataUser={dataUserInfo.findUser} dataRecipes={dataRecipes.recipesByUser} />
  );
};

export default UserPerfil;
