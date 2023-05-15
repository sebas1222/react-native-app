import { SafeAreaView, StyleSheet, View, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MAIN_COLORS } from '@helpers/theme';
import { RecipeTypes, UserTypes } from '@interfaces/index';
import MenuButtons from '@molecules/MenuButtons';
import UserPerfilPresentation from '@organisms/UserPerfilPresentation';
import useGetCurrentUser from '@hooks/useGetCurrentUser';
import UserList from '@organisms/UserList';
import RecipeList from '@organisms/RecipeList';

interface UserPerfilTemplateProps {
  dataUser: UserTypes;
  dataRecipes: RecipeTypes[];
}
const PROFILE_SECTIONS = {
  Recipes: 'Recipes',
  Following: 'Following',
  Followers: 'Followers',
};
const UserPerfilTemplate = ({ dataUser, dataRecipes }: UserPerfilTemplateProps) => {
  const [currentSection, setCurrentSection] = useState<string>(PROFILE_SECTIONS.Recipes);
  const currentUser = useGetCurrentUser();

  useEffect(() => {
    setCurrentSection(PROFILE_SECTIONS.Recipes);
    console.log('xd');
  }, [dataUser.id]);

  return (
    <SafeAreaView style={[UserPerfilTemplateStyles.mainContainer]}>
      <ImageBackground
        style={UserPerfilTemplateStyles.imageBackGround}
        resizeMode="cover"
        source={require('../../assets/imagebg.jpg')}
      >
        <UserPerfilPresentation
          editable={dataUser.id === currentUser._id ? true : false}
          dataUser={dataUser}
        />
      </ImageBackground>
      <View style={{ flex: 0.7 }}>
        <MenuButtons
          value={currentSection}
          numSection={3}
          onChangeOption={(value) => setCurrentSection(value)}
          options={[
            { id: '1', value: 'Recipes', valueLabel: `Recetas (${dataRecipes.length})` },
            {
              id: '2',
              value: 'Following',
              valueLabel: `Siguiendo (${dataUser.following.length})`,
            },
            {
              id: '3',
              value: 'Followers',
              valueLabel: `Seguidores (${dataUser.followers.length})`,
            },
          ]}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: MAIN_COLORS.quartery,
          }}
        >
          {currentSection === PROFILE_SECTIONS.Following && (
            <UserList dataUsers={dataUser.following} />
          )}
          {currentSection === PROFILE_SECTIONS.Followers && (
            <UserList dataUsers={dataUser.followers} />
          )}
          {currentSection === PROFILE_SECTIONS.Recipes && (
            <RecipeList orientation="vertical" dataRecipes={dataRecipes} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const UserPerfilTemplateStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBackGround: {
    flex: 0.3,
    justifyContent: 'flex-end',
  },
});
export default UserPerfilTemplate;
