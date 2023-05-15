import { StyleSheet, View, TouchableNativeFeedback, AccessibilityState } from 'react-native';
import React from 'react';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { MAIN_COLORS } from '@helpers/theme';

interface RCCustomTabProps extends BottomTabBarButtonProps {
  icon?: React.ReactNode;
  accessibilityState: AccessibilityState | undefined;
}

const RCCustomTab = ({ icon, accessibilityState, ...props }: RCCustomTabProps) => {
  const { onPress } = props;

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={[
          RCCustomTabStyles.container,
          accessibilityState?.selected && RCCustomTabStyles.tabSelected,
        ]}
      >
        {icon}
      </View>
    </TouchableNativeFeedback>
  );
};

const RCCustomTabStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  tabSelected: {
    backgroundColor: MAIN_COLORS.primary,
  },
});

export default RCCustomTab;
