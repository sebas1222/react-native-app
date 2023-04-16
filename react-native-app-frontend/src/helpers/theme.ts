import { TextStyle, ViewStyle } from "react-native";

export const MAIN_COLORS = {
  primary: "#0BDD00",
  secondary: "#252525",
  tertiary: "#000000",
  quartery: "#FFFFFF",
  danger: "#f24e1e",
};

export const CONTAINER_STYLES: { [key: string]: ViewStyle } = {
  mainContainer: {
    flex: 1, // con flex 1 indicar que el mainContainer ocupara todo el ancho y alto posible
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
};

export const BUTTON_STYLES: { [key: string]: ViewStyle } = {
  primaryButton: {
    backgroundColor: MAIN_COLORS.primary,
    padding: 8,
  },
  secondaryButton: {
    backgroundColor: MAIN_COLORS.secondary,
    padding: 8,
  },
  tertiaryButton: {
    backgroundColor: MAIN_COLORS.tertiary,
    padding: 8,
  },
  quarteryButton: {
    backgroundColor: MAIN_COLORS.quartery,
    padding: 8,
  },
};

export const TYPOGRAPHY_STYLES: { [key: string]: TextStyle } = {
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
