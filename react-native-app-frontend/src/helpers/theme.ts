import { TextStyle, ViewStyle } from "react-native";

export const MAIN_COLORS = {
  primary: "#FF8400",
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

export const BUTTON_STYLES: {
  [key: string]: { containerStyle: ViewStyle; textStyle: TextStyle };
} = {
  primaryButton: {
    containerStyle: {
      backgroundColor: MAIN_COLORS.primary,
    },
    textStyle: {
      color: MAIN_COLORS.quartery,
    },
  },
  primaryButtonInner: {
    containerStyle: {
      backgroundColor: MAIN_COLORS.quartery,
      borderColor: MAIN_COLORS.primary,
    },
    textStyle: {
      color: MAIN_COLORS.primary,
    },
  },
  secondaryButton: {
    containerStyle: {
      backgroundColor: MAIN_COLORS.secondary,
    },
    textStyle: {
      color: MAIN_COLORS.quartery,
    },
  },
  tertiaryButton: {
    containerStyle: {
      backgroundColor: MAIN_COLORS.tertiary,
    },
    textStyle: {
      color: MAIN_COLORS.quartery,
    },
  },
  quarteryButton: {
    containerStyle: {
      backgroundColor: MAIN_COLORS.quartery,
    },
    textStyle: {
      color: MAIN_COLORS.tertiary,
    },
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
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  paragraph: {
    fontWeight: "normal",
    lineHeight: 20,
  },
};
