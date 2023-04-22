import { MAIN_COLORS } from "@helpers/theme";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "@screens/Login";
import Register from "@screens/Register";
import { RootStackParamList } from "@interfaces/index";
import BottomTabNavigator from "./BottomTabNavigator";
import Recipes from "@screens/Recipes";
import RecipeDetails from "@screens/RecipeDetails";

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: MAIN_COLORS.primary,
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        options={{ headerTitle: "Iniciar Sesión", headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerTitle: "Registrarse" }}
        component={Register}
      />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen
        name="RecipeDetails"
        options={{ presentation: "modal" }}
        component={RecipeDetails}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
