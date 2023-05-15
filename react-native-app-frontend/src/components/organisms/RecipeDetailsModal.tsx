import { View, Text, StyleSheet, ScrollView, SectionList } from 'react-native';
import React, { useState } from 'react';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import RCButton from '@atoms/RCButton';
import RecipeImagesSlider from '@organisms/RecipeImagesSlider';
import { NavigationProps, RecipeTypes } from '@interfaces/index';
import RCRecipeBoxInfo from '@atoms/RCRecipeBoxInfo';
import RCTextLink from '@atoms/RCTextLink';
import { useNavigation } from '@react-navigation/native';
interface RecipeDetailsModalProps {
  dataRecipe: RecipeTypes;
}

const RecipeDetailsModal = ({ dataRecipe }: RecipeDetailsModalProps) => {
  const [currentInfo, setCurrentInfo] = useState<string>('Ingredientes');
  const navigation = useNavigation<NavigationProps['UserPerfil']>();

  const navigateToUserPerfil = () => {
    navigation.navigate('UserPerfil', { userId: dataRecipe.author.id });
  };

  return (
    <View style={RecipeDetailsModalStyles.container}>
      <View style={RecipeDetailsModalStyles.sliderContainer}>
        <RecipeImagesSlider dataImages={dataRecipe?.images} />
      </View>
      <View style={{ flex: 0.6 }}>
        <ScrollView contentContainerStyle={RecipeDetailsModalStyles.bottomSheetContainer}>
          <View style={RecipeDetailsModalStyles.primaryInfoContainer}>
            <View style={RecipeDetailsModalStyles.topContainer}>
              <View style={{ flex: 1 }}>
                <Text style={TYPOGRAPHY_STYLES.title}>{dataRecipe?.name}</Text>
                <RCTextLink text={dataRecipe?.author.name} onPress={() => navigateToUserPerfil()} />
              </View>

              <View style={RecipeDetailsModalStyles.likesContainer}>
                <AntDesign name="heart" size={20} color={MAIN_COLORS.quartery} />
                <Text style={{ color: MAIN_COLORS.quartery, fontWeight: 'bold' }}>1.2k</Text>
              </View>
            </View>
            <View>
              <Text style={TYPOGRAPHY_STYLES.paragraph}>{dataRecipe?.description}</Text>
            </View>
            <View style={{ gap: 10 }}>
              <View style={RecipeDetailsModalStyles.boxesContainer}>
                <RCRecipeBoxInfo
                  icon={<Entypo name="time-slot" size={24} color={MAIN_COLORS.primary} />}
                  type="min"
                  info={dataRecipe?.duration}
                />
                <RCRecipeBoxInfo
                  icon={<AntDesign name="filter" size={24} color={MAIN_COLORS.primary} />}
                  info={dataRecipe.category.name}
                />
                <RCRecipeBoxInfo
                  icon={
                    <MaterialCommunityIcons
                      name="food-fork-drink"
                      size={24}
                      color={MAIN_COLORS.primary}
                    />
                  }
                  info={dataRecipe.ingredients.length}
                  type="Ingredientes"
                />
                <RCRecipeBoxInfo
                  icon={
                    <MaterialCommunityIcons name="stairs" size={24} color={MAIN_COLORS.primary} />
                  }
                  info={dataRecipe.steps.length}
                  type="Pasos"
                />
              </View>
            </View>
          </View>
          <View style={RecipeDetailsModalStyles.changeContainer}>
            <RCButton
              onPress={() => setCurrentInfo('Ingredientes')}
              text="Ingredientes"
              type={currentInfo === 'Ingredientes' ? 'primaryButton' : null}
              styles={{
                buttonStyles: {
                  paddingHorizontal: 30,
                  paddingVertical: 12,
                },
              }}
            />
            <RCButton
              onPress={() => setCurrentInfo('Preparación')}
              text="Preparación"
              type={currentInfo === 'Preparación' ? 'primaryButton' : null}
              styles={{
                buttonStyles: {
                  paddingHorizontal: 30,
                  paddingVertical: 12,
                },
              }}
            />
          </View>
          <View style={RecipeDetailsModalStyles.bottomInfo}>
            <Text style={[TYPOGRAPHY_STYLES.subtitle, { color: MAIN_COLORS.quartery }]}>
              {currentInfo === 'Preparación' ? 'Preparación' : 'Ingredientes'}
            </Text>
            {currentInfo === 'Preparación' ? (
              <SectionList
                scrollEnabled={false}
                sections={[{ title: 'Preparación', data: dataRecipe.steps }]}
                stickySectionHeadersEnabled={true}
                renderItem={({ item: step }) => (
                  <Text style={{ color: MAIN_COLORS.quartery }}>
                    {step.step_number}- {step.description}
                  </Text>
                )}
              />
            ) : (
              <SectionList
                scrollEnabled={false}
                sections={[{ title: 'Ingredientes', data: dataRecipe.ingredients }]}
                renderItem={({ item: ingredient }) => (
                  <Text style={{ color: MAIN_COLORS.quartery }}>- {ingredient}</Text>
                )}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const RecipeDetailsModalStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  sliderContainer: {
    flex: 0.4,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    gap: 20,
  },
  primaryInfoContainer: {
    gap: 20,
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesContainer: {
    flexDirection: 'row',
    backgroundColor: MAIN_COLORS.primary,
    borderRadius: 999,
    padding: 10,
    gap: 5,
  },
  boxesContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  bottomInfo: {
    gap: 10,
    backgroundColor: MAIN_COLORS.primary,
    padding: 20,
  },
  changeContainer: {
    backgroundColor: '#f3f3f3',
    alignSelf: 'center',
    gap: 5,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default RecipeDetailsModal;
