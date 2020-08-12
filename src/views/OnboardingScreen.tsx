import React from 'react';
import { Image, StatusBar } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { NavigationProps } from 'modules/navigation';

type Props = NavigationProps<'onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  function handleOnSkip() {
    navigation.replace('main');
  }

  function handleOnDone() {
    // Todo - finished onboarding
    navigation.replace('main');
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            title: 'Uslikaj',
            subtitle: 'Uslikajte ili odaberite postojeću fotografiju',
            image: (
              <Image source={require('assets/images/onboarding-camera.png')} />
            ),
          },
          {
            backgroundColor: '#fff',
            title: 'Opiši',
            subtitle: 'Napišite detaljan opis situacije',
            image: (
              <Image
                source={require('assets/images/onboarding-description.png')}
              />
            ),
          },
          {
            backgroundColor: '#fff',
            title: 'Pošalji',
            subtitle: 'Pošaljite prijavu na razmatranje',
            image: (
              <Image source={require('assets/images/onboarding-upload.png')} />
            ),
          },
        ]}
        nextLabel="Dalje"
        skipLabel="Preskoči"
        bottomBarHighlight={false}
        bottomBarHeight={100}
        onSkip={handleOnSkip}
        onDone={handleOnDone}
      />
    </>
  );
};
