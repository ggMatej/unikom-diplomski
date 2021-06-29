import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationProps } from 'modules/navigation';
import { Color } from 'global-styles';

type Props = NavigationProps<'onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({}) => {
  return (
    <>
      <StatusBar backgroundColor={Color.Background} />
    </>
  );
};
