import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
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
        <Stack.Screen
          options={{
            ...TransitionPresets.SlideFromRightIOS,
          }}
          name="onboarding"
          component={views.OnboardingScreen}
        />
        <Stack.Screen
          options={{
            ...TransitionPresets.ScaleFromCenterAndroid,
          }}
          name="main"
          component={MainNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
