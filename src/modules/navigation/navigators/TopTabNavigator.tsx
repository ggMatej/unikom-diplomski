import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as views from 'views';
import { Color } from 'global-styles';

import { NavigationParamList } from 'modules/navigation/models';

export const TopTabNavigator: React.FC = () => {
  const Tab = createMaterialTopTabNavigator<NavigationParamList>();

  return (
    <Tab.Navigator
      backBehavior="none"
      swipeEnabled={false}
      tabBarOptions={{
        style: {
          backgroundColor: Color.Background,
        },

        activeTintColor: Color.Secondary,
        indicatorStyle: {
          backgroundColor: Color.Secondary,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        options={{
          title: 'NOVA PRIJAVA',
        }}
        name="home"
        component={views.Home}
      />
      <Tab.Screen
        options={{
          title: 'MOJE PRIJAVE',
        }}
        name="reports"
        component={views.Reports}
      />
    </Tab.Navigator>
  );
};
