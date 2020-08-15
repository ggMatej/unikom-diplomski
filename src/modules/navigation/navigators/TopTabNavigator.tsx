import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import * as views from 'views';
import { Color } from 'global-styles';

import { NavigationParamList } from '..';

export const TopTabNavigator: React.FC = () => {
  const Tab = createMaterialTopTabNavigator<NavigationParamList>();

  return (
    <Tab.Navigator
      backBehavior="none"
      tabBarOptions={{
        style: {
          backgroundColor: Color.Background,
        },
      }}
    >
      <Tab.Screen name="home" component={views.Home} />
      <Tab.Screen name="reports" component={views.Reports} />
    </Tab.Navigator>
  );
};
