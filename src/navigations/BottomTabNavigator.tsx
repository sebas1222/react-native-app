import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MAIN_COLORS } from "@helpers/theme";
import Home from "@screens/Home";
import RCCustomTab from "@atoms/RCCustomTab";
import Recipes from "@screens/Recipes";
import Search from "@screens/Search";
import { RootStackParamList } from "@interfaces/index";
import { RouteProp, useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator<RootStackParamList>();
export default function BottomTabNavigator() {
  const route = useRoute<RouteProp<RootStackParamList, "HomeTab">>();
  const { authToken } = route.params;
  console.log(route);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { alignItems: "center" },
        headerShown: false,
      }}
      initialRouteName={"HomeTab"}
    >
      <Tab.Screen
        name={"HomeTab"}
        component={Home}
        options={{
          tabBarButton: ({ accessibilityState, ...props }) => (
            <RCCustomTab
              accessibilityState={accessibilityState}
              icon={
                <Ionicons
                  name="home-outline"
                  style={{ marginBottom: 4 }}
                  size={22}
                  color={
                    accessibilityState?.selected
                      ? MAIN_COLORS.quartery
                      : MAIN_COLORS.tertiary
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />

      <Tab.Screen
        name={"Recipes"}
        initialParams={{ authToken: authToken }}
        component={Recipes}
        options={{
          tabBarButton: ({ accessibilityState, ...props }) => (
            <RCCustomTab
              accessibilityState={accessibilityState}
              icon={
                <Ionicons
                  name="book-outline"
                  style={{ marginBottom: 4 }}
                  size={22}
                  color={
                    accessibilityState?.selected
                      ? MAIN_COLORS.quartery
                      : MAIN_COLORS.tertiary
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Search"}
        component={Search}
        options={{
          tabBarButton: ({ accessibilityState, ...props }) => (
            <RCCustomTab
              accessibilityState={accessibilityState}
              icon={
                <Feather
                  name="search"
                  size={22}
                  style={{ marginBottom: 4 }}
                  color={
                    accessibilityState?.selected
                      ? MAIN_COLORS.quartery
                      : MAIN_COLORS.tertiary
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
