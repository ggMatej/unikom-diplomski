import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { NavigationProps } from 'modules/navigation';

type Props = NavigationProps<'splash'>;

export const Splash: React.FC<Props> = ({ navigation }) => {
  // Ovo ce bit spremljeno u redux, za sada ovo da imam lakše za testing
  const finishedOnboarding = true;

  function onMount() {
    if (finishedOnboarding) {
      navigation.replace('main');
      return;
    }
    navigation.replace('onboarding');
  }

  useEffect(onMount, [finishedOnboarding, navigation]);

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};
