import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationProps } from 'modules/navigation';

type Props = NavigationProps<'splash'>;

export const Splash: React.FC<Props> = ({ navigation }) => {
  // Ovo ce bit spremljeno u redux, za sada ovo da imam lakše za testing
  const finishedOnboarding = false;

  function onMount() {
    if (finishedOnboarding) {
      navigation.replace('main');
      SplashScreen.hide();
      return;
    }
    navigation.replace('onboarding');
    SplashScreen.hide();
  }

  useEffect(onMount, [finishedOnboarding, navigation]);

  return null;
};
