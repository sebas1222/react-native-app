import { View, Text, StyleSheet, ColorValue } from 'react-native';
import React from 'react';
import RCButton from '@atoms/RCButton';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { ButtonStylesTypes } from '@interfaces/index';

interface CallToActionCardProps {
  icon?: React.ReactNode;
  description: string;
  backGroundColor?: ColorValue;
  buttonType?: keyof ButtonStylesTypes;
  buttonText?: string;
  toAction: () => void;
}

const CallToActionCard = ({
  icon,
  description = 'Ir a la acción',
  backGroundColor,
  buttonType = 'primaryButton',
  buttonText = 'Llevame allá',
  toAction,
}: CallToActionCardProps) => {
  return (
    <View style={[CallToActionStyles.container, { backgroundColor: backGroundColor }]}>
      <Text style={[CallToActionStyles.textContainer, TYPOGRAPHY_STYLES.subtitle]}>
        {description}
      </Text>
      <View style={[CallToActionStyles.iconContainer]}>{icon}</View>
      <RCButton text={buttonText} onPress={() => toAction()} type={buttonType} />
    </View>
  );
};

const CallToActionStyles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    borderRadius: 10,
    backgroundColor: MAIN_COLORS.quartery,
    alignItems: 'center',
  },
  textContainer: {
    color: MAIN_COLORS.tertiary,
  },
  iconContainer: {
    alignSelf: 'center',
  },
});

export default CallToActionCard;
