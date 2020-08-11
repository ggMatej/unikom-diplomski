import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { NavigationProps } from 'modules/navigation';

type Props = NavigationProps<'splash'>;

export const Splash: React.FC<Props> = ({ navigation }) => {
  // Ovo ce bit spremljeno u redux, za sada ovo da imam lakše za testing
  const finishedOnboarding = true;

  function onMount() {
    SplashScreen.hide();
    if (finishedOnboarding) {
      navigation.replace('main');
      return;
    }
    navigation.replace('onboarding');
  }

  useEffect(onMount, [finishedOnboarding, navigation]);

  return null;
};
