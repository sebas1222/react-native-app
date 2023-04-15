import { StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { mainColors } from "@helpers/theme";

interface RCCustomTabProps extends BottomTabBarButtonProps {
  icon: React.ReactNode;
}

const RCCustomTab = ({ icon, ...props }: RCCustomTabProps) => {
  const { accessibilityState, onPress } = props;

  return (
    <Pressable
      style={[
        RCCustomTabStyles.container,
        accessibilityState?.selected && RCCustomTabStyles.tabSelected,
      ]}
      onPress={onPress}
    >
      {icon}
    </Pressable>
  );
};

const RCCustomTabStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  tabSelected: {
    backgroundColor: mainColors.quartery,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default React.memo(RCCustomTab);
