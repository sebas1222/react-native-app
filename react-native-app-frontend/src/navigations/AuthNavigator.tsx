import { mainColors } from "@helpers/theme";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "@screens/Login";
import Register from "@screens/Register";
import { RootStackParamList } from "@interfaces/index";
import { routes } from ".";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: mainColors.quartery,
        },
      }}
      initialRouteName={routes.authRoutes.login.init}
    >
      <Stack.Screen
        name={routes.authRoutes.login.init}
        options={{ headerTitle: routes.authRoutes.login.title }}
        component={Login}
      />
      <Stack.Screen
        name={routes.authRoutes.register.init}
        options={{ headerTitle: routes.authRoutes.register.title }}
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={routes.authRoutes.home.init}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
