import {
  View,
  Text,
  TouchableOpacity,
  TextStyle,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React from "react";
import { MAIN_COLORS } from "@helpers/theme";

interface RCTextLinkProps {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
  styles?: { linkStyles?: ViewStyle; textStyles?: TextStyle };
}

const RCTextLink = ({
  text = "TextLink",
  onPress,
  styles,
  icon,
}: RCTextLinkProps) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={() => onPress && onPress()}>
      <View style={[RCTextLinkStyles.container, styles?.linkStyles]}>
        <Text style={[RCTextLinkStyles.text, styles?.textStyles]}>{text}</Text>
        {icon && icon}
      </View>
    </TouchableOpacity>
  );
};
const RCTextLinkStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 2,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: MAIN_COLORS.primary,
  },
});

export default RCTextLink;
