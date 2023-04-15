import { MAIN_COLORS } from "@helpers/theme";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "@screens/Login";
import Register from "@screens/Register";
import { RootStackParamList } from "@interfaces/index";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: MAIN_COLORS.quartery,
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login"
        options={{ headerTitle: "Iniciar Sesión" }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerTitle: "Registrarse" }}
        component={Register}
      />
      <Stack.Screen name="Home" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
