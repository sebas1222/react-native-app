import { Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { TYPOGRAPHY_STYLES } from '@helpers/theme';

interface AddRecipeStepProps {
  title: string;
  image?: string;
  children: React.ReactNode;
}

const AddRecipeStep = ({ title, children }: AddRecipeStepProps) => {
  return (
    <>
      <Text style={TYPOGRAPHY_STYLES.megaTitle}>{title}</Text>
      <Image
        source={require('../../assets/cooking.png')}
        style={AddRecipeStepStyles.imageContainer}
      ></Image>
      {children}
    </>
  );
};

const AddRecipeStepStyles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 250,
  },
});

export default AddRecipeStep;
