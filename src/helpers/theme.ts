import { ButtonStylesTypes, ContainerStylesTypes, TypographyStylesTypes } from '@interfaces/index';
import { Platform, StatusBar } from 'react-native';

export const MAIN_COLORS = {
  primary: '#58D68D',
  secondary: '#252525',
  tertiary: '#242526',
  quartery: '#FFFFFF',
  danger: '#f24e1e',
};

export const CONTAINER_STYLES: ContainerStylesTypes = {
  mainContainer: {
    flex: 1, // con flex 1 indicar que el mainContainer ocupara todo el ancho y alto posible
    paddingTop:
      Platform.OS === 'android' ? StatusBar?.currentHeight && StatusBar.currentHeight + 15 : 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
};

export const BUTTON_STYLES: ButtonStylesTypes = {
  primaryButton: {
    containerStyle: {
      backgroundColor: MAIN_COLORS.primary,
      borderColor: MAIN_COLORS.primary,
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

export const TYPOGRAPHY_STYLES: TypographyStylesTypes = {
  superTitle: {
    fontSize: 60,
    fontWeight: '900',
  },
  megaTitle: {
    fontSize: 40,
    fontWeight: '900',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  paragraph: {
    fontWeight: 'normal',
    lineHeight: 20,
  },
};
