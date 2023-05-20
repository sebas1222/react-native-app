import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import React from 'react';
import RCButton from '@atoms/RCButton';
import { MAIN_COLORS } from '@helpers/theme';
import { SelectDataTypes } from '@interfaces/index';

interface MenuButtonsProps {
  options: SelectDataTypes[];
  numSection: number; //entero
  value: string;
  onChangeOption: (value: string) => void;
}

const MenuButtons = ({ options, value, onChangeOption, numSection }: MenuButtonsProps) => {
  const handleChangeOption = (option: string) => {
    onChangeOption(option);
  };
  const screenWidth = Dimensions.get('screen').width;
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ borderTopColor: '#f3f3f3', borderTopWidth: 2 }}
        contentContainerStyle={{ backgroundColor: MAIN_COLORS.quartery }}
        data={options}
        renderItem={({ item: option }) => (
          <View style={{ width: screenWidth / numSection }}>
            <RCButton
              text={option.valueLabel}
              onPress={() => handleChangeOption(option.value)}
              styles={{
                buttonStyles:
                  value === option.value
                    ? MenuButtonsStyles.optionSelected
                    : MenuButtonsStyles.optionNotSelected,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const MenuButtonsStyles = StyleSheet.create({
  optionNotSelected: {
    borderRadius: 1,
    paddingVertical: 15,
    borderWidth: 0,
    borderBottomWidth: 3,
  },
  optionSelected: {
    paddingVertical: 15,
    borderRadius: 1,
    borderColor: MAIN_COLORS.primary,
    borderWidth: 0,
    borderBottomWidth: 3,
  },
});

export default MenuButtons;
