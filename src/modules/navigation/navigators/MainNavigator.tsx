import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import * as views from 'views';

import { NavigationParamList } from '..';

export const MainNavigator: React.FC = () => {
  const Stack = createStackNavigator<NavigationParamList>();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={views.Home} />
    </Stack.Navigator>
  );
};
