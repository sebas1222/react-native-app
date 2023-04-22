import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { BUTTON_STYLES, MAIN_COLORS } from "@helpers/theme";

interface RCButtonProps {
  text?: string;
  type?:
    | "primaryButton"
    | "secondaryButton"
    | "tertiaryButton"
    | "quarteryButton"
    | null;
  onPress: () => void;
  icon?: React.ReactNode;
  styles?: { buttonStyles?: ViewStyle; textStyles?: TextStyle };
}

const RCButton = ({
  text = "", //valores por defecto
  type,
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
      <TouchableNativeFeedback
        testID="RCButton_touchable"
        onPress={() => onPress()}
      >
        <View
          style={[
            RCButtonStyles.buttonContainer,
            type && BUTTON_STYLES[type].containerStyle,

            styles.buttonStyles,
          ]}
        >
          <Text
            style={[
              RCButtonStyles.buttonText,
              type && BUTTON_STYLES[type].textStyle,
              styles.textStyles,
            ]}
          >
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
    padding: 8,
    borderRadius: 8,
    gap: 2,
  },
  buttonText: {
    fontWeight: "700",
    color: MAIN_COLORS.tertiary,
  },
});

export default RCButton;
