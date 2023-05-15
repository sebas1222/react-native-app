import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { MAIN_COLORS } from '@helpers/theme';
import Home from '@screens/Home';
import RCCustomTab from '@atoms/RCCustomTab';
import Search from '@screens/Search';
import { RootStackParamList } from '@interfaces/index';
import AddRecipe from '@screens/AddRecipe';

const Tab = createBottomTabNavigator<RootStackParamList>();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { alignItems: 'center' },
        headerShown: false,
      }}
      initialRouteName={'HomeTab'}
    >
      <Tab.Screen
        name={'HomeTab'}
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
                  color={accessibilityState?.selected ? MAIN_COLORS.quartery : MAIN_COLORS.primary}
                />
              }
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'AddRecipe'}
        component={AddRecipe}
        options={{
          tabBarButton: ({ accessibilityState, ...props }) => (
            <RCCustomTab
              accessibilityState={accessibilityState}
              icon={
                <Ionicons
                  name="book-outline"
                  style={{ marginBottom: 4 }}
                  size={22}
                  color={accessibilityState?.selected ? MAIN_COLORS.quartery : MAIN_COLORS.primary}
                />
              }
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'Search'}
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
                  color={accessibilityState?.selected ? MAIN_COLORS.quartery : MAIN_COLORS.primary}
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
