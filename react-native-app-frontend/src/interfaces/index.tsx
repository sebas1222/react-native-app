import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
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
export interface AddRecipeFormTypes {
  name: string;
  description: string;
  duration: number;
  category: CategoryTypes;
  ingredients: Array<IngredientRecipeTypes>;
  steps: Array<StepRecipeTypes>;
}
export interface CategoryTypes {
  id: string;
  name: string;
}
export interface StepRecipeTypes {
  description: string;
  id: string;
}
export interface IngredientRecipeTypes {
  name: string;
  id: string;
}

//Categories

export interface Category {
  id: string;
  name: string;
}

//Recipes
export interface Recipe {
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
  image?: any;
}

//navigation
export type RootStackParamList = {
  Login: undefined;
  Home: { authToken: string };
  Register: undefined;
  ForgotPassWord: undefined;
  HomeTab: { authToken: string };
  Recipes: { authToken: string };
  RecipeDetails: { recipeData: Recipe };
  Search: undefined;
  Settings: undefined;
};

export type NavigationProps = {
  Login: StackNavigationProp<RootStackParamList, "Login">;
  Home: StackNavigationProp<RootStackParamList, "Home">;
  Register: StackNavigationProp<RootStackParamList, "Register">;
  ForgotPassword: StackNavigationProp<RootStackParamList, "ForgotPassWord">;
  RecipeDetails: StackNavigationProp<RootStackParamList, "RecipeDetails">;
  HomeTab: BottomTabNavigationProp<RootStackParamList, "HomeTab">;
  Search: BottomTabNavigationProp<RootStackParamList, "Search">;
  Recipes: BottomTabNavigationProp<RootStackParamList, "Recipes">;
  Settings: BottomTabNavigationProp<RootStackParamList, "Settings">;
};
