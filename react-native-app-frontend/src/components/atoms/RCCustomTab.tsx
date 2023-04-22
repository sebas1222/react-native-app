import {
  StyleSheet,
  Pressable,
  Text,
  View,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { MAIN_COLORS } from "@helpers/theme";

interface RCCustomTabProps extends BottomTabBarButtonProps {
  icon?: React.ReactNode;
}

const RCCustomTab = ({ icon, ...props }: RCCustomTabProps) => {
  const { accessibilityState, onPress } = props;

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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  tabSelected: {
    backgroundColor: MAIN_COLORS.primary,
  },
});

export default RCCustomTab;
