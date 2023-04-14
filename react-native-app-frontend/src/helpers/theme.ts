import { TextStyle, ViewStyle } from "react-native";

export const mainColors = {
  primary: "#EA5C2B",
  secondary: "#FF7F3F",
  tertiary: "#F6D860",
  quartery: "#66c00b",
  fifth: "#19191a",
  danger: "#f24e1e",
};

export const containerStyles: { [key: string]: ViewStyle } = {
  mainContainer: {
    flex: 1, // con flex 1 indicar que el mainContainer ocupara todo el ancho y alto posible
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
};

export const buttonStyles: { [key: string]: ViewStyle } = {
  primary_button: {
    backgroundColor: mainColors.primary,
    padding: 8,
  },
  secondary_button: {
    backgroundColor: mainColors.secondary,
    padding: 8,
  },
  tertiary_button: {
    backgroundColor: mainColors.tertiary,
    padding: 8,
  },
  quartery_button: {
    backgroundColor: mainColors.quartery,
    padding: 8,
  },
};

export const typographyStyles: { [key: string]: TextStyle } = {
  superTitle: {
    fontSize: 60,
    fontWeight: "900",
  },
  megaTitle: {
    fontSize: 40,
    fontWeight: "900",
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "left",
  },
};
