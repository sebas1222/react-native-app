import { MAIN_COLORS } from '@helpers/theme';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Login from '@screens/Login';
import Register from '@screens/Register';
import { RootStackParamList } from '@interfaces/index';
import RecipeDetails from '@screens/RecipeDetails';
import UserPerfil from '@screens/UserPerfil';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: MAIN_COLORS.primary,
        },
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabNavigator} />
      <Stack.Screen
        name="RecipeDetails"
        options={{
          presentation: 'modal',
          headerTransparent: true,
          headerTitle: '',
        }}
        component={RecipeDetails}
      />
      <Stack.Screen
        name="UserPerfil"
        options={{
          presentation: 'modal',
          headerTransparent: true,
          headerTitle: '',
        }}
        component={UserPerfil}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
