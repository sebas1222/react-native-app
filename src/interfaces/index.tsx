import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { TextStyle, ViewStyle } from 'react-native';

//Tipado de formularios
export interface LoginFormTypes {
  email: string;
  password: string;
}

export interface RegisterFormTypes {
  name: string;
  email: string;
  password: string;
  re_password: string;
}
export interface AddRecipeFormTypes {
  name: string;
  description: string;
  duration: number;
  category: CategoryTypes;
  ingredients: IngredientRecipeTypes[];
  steps: StepRecipeTypes[];
  images: ImagePicker.ImagePickerAsset[];
}

export interface StepRecipeTypes {
  description: string;
  id: string;
}
export interface IngredientRecipeTypes {
  name: string;
  id: string;
}

//Tipado de data traida de la BD

export interface CategoryTypes {
  id: string;
  name: string;
}

export interface RecipeTypes {
  id: string;
  author: {
    id: string;
    name: string;
  };
  name: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  duration: number;
  ingredients: string[];
  steps: {
    description: string;
    step_number: number;
  }[];
  images: string[];
  likes: {
    id: string;
    name: string;
  }[];
}

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  avatar: string;
  following: UserTypes[];
  followers: UserTypes[];
}

export interface TokenObjectTypes {
  _id: string;
  name: string;
  avatar: string;
  email: string;
  followers: string[];
  following: string[];
}

//Tipado para fines de componetización
export interface SelectDataTypes {
  id: string;
  value: string;
  valueLabel: string;
  testID?: string;
}

export interface TextInputListItemTypes {
  id: string;
  value: string;
}

//Tipado para redux

export interface AuthStateTypes {
  authToken: string;
}

export interface RootReducerTypes {
  auth: AuthStateTypes;
}

//navigation
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  ForgotPassWord: undefined;
  HomeTab: undefined;
  AddRecipe: undefined;
  RecipeDetails: { recipeId: string };
  UserPerfil: { userId: string };
  Search: undefined;
  Settings: undefined;
  Favorites: undefined;
  Account: undefined;
};

export type NavigationProps = {
  Login: StackNavigationProp<RootStackParamList, 'Login'>;
  Home: StackNavigationProp<RootStackParamList, 'Home'>;
  Register: StackNavigationProp<RootStackParamList, 'Register'>;
  ForgotPassword: StackNavigationProp<RootStackParamList, 'ForgotPassWord'>;
  RecipeDetails: StackNavigationProp<RootStackParamList, 'RecipeDetails'>;
  HomeTab: BottomTabNavigationProp<RootStackParamList, 'HomeTab'>;
  Search: BottomTabNavigationProp<RootStackParamList, 'Search'>;
  AddRecipe: BottomTabNavigationProp<RootStackParamList, 'AddRecipe'>;
  Settings: BottomTabNavigationProp<RootStackParamList, 'Settings'>;
  UserPerfil: BottomTabNavigationProp<RootStackParamList, 'UserPerfil'>;
  Favorites: DrawerNavigationProp<RootStackParamList, 'Favorites'>;
  Account: DrawerNavigationProp<RootStackParamList, 'Account'>;
};

// Tipado de estilos globales

export type TypographyStylesTypes = {
  superTitle: TextStyle;
  megaTitle: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  paragraph: TextStyle;
};

export type ButtonStylesTypes = {
  primaryButton: ButtonType;
  primaryButtonInner: ButtonType;
  secondaryButton: ButtonType;
  tertiaryButton: ButtonType;
  quarteryButton: ButtonType;
};

type ButtonType = {
  containerStyle: ViewStyle;
  textStyle: TextStyle;
};

export type ContainerStylesTypes = {
  mainContainer: ViewStyle;
};
