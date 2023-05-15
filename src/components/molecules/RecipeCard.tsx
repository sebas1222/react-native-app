import { View, Text, StyleSheet, ImageBackground, TouchableNativeFeedback } from 'react-native';
import React from 'react';
import { TYPOGRAPHY_STYLES } from '@helpers/theme';
import RCButton from '@atoms/RCButton';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProps, RecipeTypes } from '@interfaces/index';
import { useNavigation } from '@react-navigation/native';

interface RecipeCardProps {
  data: RecipeTypes;
}

const RecipeCard = ({ data }: RecipeCardProps) => {
  const navigation = useNavigation<NavigationProps['RecipeDetails']>();
  return (
    <View>
      <ImageBackground
        blurRadius={2}
        resizeMode="cover"
        style={RecipeCardStyles.recipeCardContainer}
        source={{ uri: data.images[0] }}
      >
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('RecipeDetails', { recipeId: data.id })}
        >
          <View style={RecipeCardStyles.imageMask}>
            <View style={RecipeCardStyles.imageFavButtonContainer}>
              <RCButton
                type="primaryButton"
                styles={{ buttonStyles: { padding: 4 } }}
                icon={<MaterialIcons name="favorite" size={24} color="white" />}
                onPress={() => console.log('Favorito añadido')}
              />
            </View>
            <View style={RecipeCardStyles.imageLayoutContainer}>
              <Text numberOfLines={3} style={[TYPOGRAPHY_STYLES.title, { color: 'white' }]}>
                {data?.name}
              </Text>
              <Text numberOfLines={1} style={{ color: 'white', fontSize: 12 }}>
                {data.ingredients?.length} ingredientes | {data?.duration} mins
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </ImageBackground>
    </View>
  );
};

const RecipeCardStyles = StyleSheet.create({
  recipeCardContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    aspectRatio: 1 / 1.4,
  },
  imageMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    padding: 15,
    right: 0,
    justifyContent: 'space-between',
  },
  imageFavButtonContainer: {
    alignSelf: 'flex-end',
  },
  imageLayoutContainer: { gap: 10 },
});

export default RecipeCard;
