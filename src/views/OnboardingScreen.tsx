import React from 'react';
import { Image, StatusBar, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { NavigationProps } from 'modules/navigation';
import { Color } from 'global-styles';

type Props = NavigationProps<'onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  function handleOnSkip() {
    navigation.replace('main');
  }

  function handleOnDone() {
    navigation.replace('main');
  }

  return (
    <>
      <StatusBar backgroundColor={Color.Background} />
      <Onboarding
        pages={[
          {
            backgroundColor: Color.Background,
            title: 'Uslikaj',
            subtitle: 'Uslikajte ili odaberite postojeću fotografiju',
            image: (
              <Image
                style={styles.image}
                source={require('assets/images/onboarding-camera.png')}
              />
            ),
          },
          {
            backgroundColor: Color.Background,
            title: 'Opiši',
            subtitle: 'Napišite detaljan opis situacije',
            image: (
              <Image
                style={styles.image}
                source={require('assets/images/onboarding-description.png')}
              />
            ),
          },
          {
            backgroundColor: Color.Background,
            title: 'Pošalji',
            subtitle: 'Pošaljite prijavu na razmatranje',
            image: (
              <Image
                style={styles.image}
                source={require('assets/images/onboarding-upload.png')}
              />
            ),
          },
        ]}
        nextLabel="Dalje"
        skipLabel="Preskoči"
        bottomBarHighlight={false}
        bottomBarHeight={70}
        onSkip={handleOnSkip}
        onDone={handleOnDone}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    tintColor: Color.Primary,
  },
  title: {
    color: Color.Primary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Color.Primary,
  },
  onboarding: {
    color: Color.Primary,
  },
});
