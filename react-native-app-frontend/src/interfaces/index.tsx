import { StackNavigationProp } from "@react-navigation/stack";

export interface GetAllCharactersType {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  next: string;
  pages: number;
  prev: null;
}

export interface Character {
  created: Date;
  episode: string[];
  gender: Gender;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Location;
  species: Species;
  status: Status;
  type: string;
  url: string;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export interface Location {
  name: string;
  url: string;
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}

//
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

//navigation

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  ForgotPassWord: undefined;
  HomeTab: undefined;
  Search: undefined;
  Recipes: { recipeId: number };
  Settings: undefined;
};

export type ScreenProp<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
};

export type NavigationProps = {
  Login: StackNavigationProp<RootStackParamList, "Login">;
  Home: StackNavigationProp<RootStackParamList, "Home">;
  Register: StackNavigationProp<RootStackParamList, "Register">;
  ForgotPassword: StackNavigationProp<RootStackParamList, "ForgotPassWord">;
  HomeTab: StackNavigationProp<RootStackParamList, "HomeTab">;
  Search: StackNavigationProp<RootStackParamList, "Search">;
  Recipes: StackNavigationProp<RootStackParamList, "Recipes">;
  Settings: StackNavigationProp<RootStackParamList, "Settings">;
};
