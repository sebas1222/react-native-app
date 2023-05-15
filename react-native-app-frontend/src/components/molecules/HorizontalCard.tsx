import React from 'react';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { StyleSheet, Text, View, TouchableNativeFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps, RecipeTypes } from '@interfaces/index';
import { AntDesign } from '@expo/vector-icons';

interface HorizontalCardProps {
  dataRecipe: RecipeTypes;
}

const HorizontalCard = ({ dataRecipe }: HorizontalCardProps) => {
  const navigation = useNavigation<NavigationProps['RecipeDetails']>();

  return (
    <View style={{ overflow: 'hidden', borderRadius: 10 }}>
      <TouchableNativeFeedback
        onPress={() => navigation.navigate('RecipeDetails', { recipeId: dataRecipe.id })}
      >
        <View style={HorizontalCardStyles.container}>
          <Image
            source={{ uri: dataRecipe.images[0] }}
            style={HorizontalCardStyles.imageContainer}
          ></Image>
          <View style={HorizontalCardStyles.textContainer}>
            <Text style={[TYPOGRAPHY_STYLES.subtitle]}>{dataRecipe.name}</Text>
            <Text>{dataRecipe.category.name}</Text>
            <Text>{dataRecipe.author.name}</Text>
          </View>
          <View style={HorizontalCardStyles.buttonIcon}>
            <AntDesign name="caretright" size={24} color={MAIN_COLORS.primary} />
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const HorizontalCardStyles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    overflow: 'hidden',
    borderRadius: 10,
    //backgroundColor: MAIN_COLORS.tertiary,
    backgroundColor: '#FFF',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 100,
    height: '100%',
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    color: 'black',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'left',
  },
  buttonIcon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HorizontalCard;
