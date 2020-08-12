import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import * as views from 'views';

import { MainNavigator, NavigationParamList } from '..';

export const RootNavigator: React.FC = () => {
  const Stack = createStackNavigator<NavigationParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="splash"
      >
        <Stack.Screen name="splash" component={views.Splash} />
        <Stack.Screen name="onboarding" component={views.OnboardingScreen} />
        <Stack.Screen name="main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
