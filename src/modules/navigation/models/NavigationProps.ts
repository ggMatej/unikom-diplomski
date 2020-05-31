import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { NavigationParamList } from 'modules/navigation';

export type NavigationProps<T extends keyof NavigationParamList> = {
  navigation: StackNavigationProp<NavigationParamList, T>;
  route: RouteProp<NavigationParamList, T>;
};
