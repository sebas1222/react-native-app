import { View, Text, TextStyle, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import RCButton from "@atoms/RCButton";
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from "@helpers/theme";

interface CallToActionCardProps {
  icon?: React.ReactNode;
  styles?: {
    callToActionContainerStyles?: ViewStyle;
    textStyles?: TextStyle;
    iconContainerStyles?: ViewStyle;
    buttonContainerStyles?: {
      buttonStyles?: ViewStyle;
      textStyles?: TextStyle;
    };
  };
  buttonType?:
    | "primaryButton"
    | "secondaryButton"
    | "tertiaryButton"
    | "quarteryButton";
  buttonText?: string;
  action: string;
  toAction: () => void;
}

const CallToActionCard = ({
  icon,
  styles,
  buttonType,
  action = "Ir a la acción",
  toAction,
  buttonText = "Llevame allá",
}: CallToActionCardProps) => {
  return (
    <View
      style={[
        CallToActionStyles.container,
        styles && styles.callToActionContainerStyles,
      ]}
    >
      <Text
        style={[
          CallToActionStyles.textContainer,
          TYPOGRAPHY_STYLES.subtitle,
          styles && styles.textStyles,
        ]}
      >
        {action}
      </Text>
      <View
        style={[
          CallToActionStyles.iconContainer,
          styles && styles.iconContainerStyles,
        ]}
      >
        {icon}
      </View>
      <RCButton
        text={buttonText}
        styles={{
          buttonStyles:
            styles?.buttonContainerStyles &&
            styles.buttonContainerStyles.buttonStyles,
          textStyles:
            styles?.buttonContainerStyles &&
            styles.buttonContainerStyles.textStyles,
        }}
        onPress={() => toAction()}
        type={buttonType}
      />
    </View>
  );
};

const CallToActionStyles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    borderRadius: 10,
    backgroundColor: MAIN_COLORS.tertiary,
  },
  textContainer: {
    color: "white",
  },
  iconContainer: {
    alignSelf: "center",
  },
});

export default CallToActionCard;
