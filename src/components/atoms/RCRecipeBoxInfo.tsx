import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MAIN_COLORS } from '@helpers/theme';

interface RCRecipeBoxInfoProps {
  icon: React.ReactNode;
  type?: string;
  info: string | number;
}

const RCRecipeBoxInfo = ({ icon, type, info }: RCRecipeBoxInfoProps) => {
  return (
    <View style={RCRecipeBoxInfoStyles.infoBoxContainer}>
      {icon && <View style={RCRecipeBoxInfoStyles.infoBoxLogo}>{icon}</View>}
      <View>
        {info && <Text style={RCRecipeBoxInfoStyles.infoBoxText}>{info}</Text>}
        {type && <Text style={RCRecipeBoxInfoStyles.infoBoxType}>{type}</Text>}
      </View>
    </View>
  );
};

const RCRecipeBoxInfoStyles = StyleSheet.create({
  infoBoxContainer: {
    alignItems: 'center',
    backgroundColor: MAIN_COLORS.primary,
    padding: 10,
    borderRadius: 999,
    flex: 0.25,
    gap: 5,
  },
  infoBoxLogo: {
    backgroundColor: MAIN_COLORS.quartery,
    padding: 10,
    borderRadius: 999,
  },
  infoBoxText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  infoBoxType: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});

export default RCRecipeBoxInfo;
