import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ViewStyle,
  TextStyle,
} from "react-native";
import React from "react";
import { buttonStyles } from "@helpers/theme";

interface RCButtonProps {
  text?: string;
  type?:
    | "primary_button"
    | "secondary_button"
    | "tertiary_button"
    | "quartery_button";
  onPress: () => void;
  icon?: React.ReactNode;
  styles?: { buttonStyles?: ViewStyle; textStyles?: TextStyle };
}

const RCButton = ({
  text = "", //valores por defecto
  type = "primary_button",
  onPress,
  icon,
  styles = { buttonStyles: {}, textStyles: {} },
}: RCButtonProps) => {
  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius:
          styles.buttonStyles?.borderRadius ||
          RCButtonStyles.buttonContainer.borderRadius,
      }}
    >
      <TouchableNativeFeedback onPress={() => onPress && onPress()}>
        <View
          style={[
            buttonStyles[type],
            RCButtonStyles.buttonContainer,
            styles.buttonStyles,
          ]}
        >
          <Text style={[RCButtonStyles.buttonText, styles.textStyles]}>
            {text}
          </Text>
          {icon && icon}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const RCButtonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    gap: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
  },
});

export default RCButton;
