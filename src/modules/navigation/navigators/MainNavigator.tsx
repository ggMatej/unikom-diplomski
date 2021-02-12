import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Color } from 'global-styles';
import { HeaderLogo } from 'components/HeaderLogo';
import { HeaderInfoIcon } from 'components/HeaderInfoIcon';
import {
  NavigationParamList,
  NavigationProps,
} from 'modules/navigation/models';

import { TopTabNavigator } from './TopTabNavigator';

type Props = NavigationProps<'main'>;

export const MainNavigator: React.FC<Props> = ({ navigation, route }) => {
  const Stack = createStackNavigator<NavigationParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        title: 'UNIKOM',
        headerStyle: {
          backgroundColor: Color.Background,
          elevation: 0,
        },
        headerTintColor: Color.TextWhite,
        headerTitleStyle: {
          color: Color.Secondary,
          fontWeight: 'bold',
          letterSpacing: 2,
        },
        // eslint-disable-next-line react/display-name
        headerTitle: () => <HeaderLogo />,
        // eslint-disable-next-line react/display-name
        headerRight: () => (
          <HeaderInfoIcon navigation={navigation} route={route} />
        ),
      }}
    >
      <Stack.Screen name="tab" component={TopTabNavigator} />
    </Stack.Navigator>
  );
};
