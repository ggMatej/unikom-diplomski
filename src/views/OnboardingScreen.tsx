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
    // Todo - finished onboarding
    navigation.replace('main');
  }

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <Onboarding
        pages={[
          {
            backgroundColor: Color.Primary,
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
            backgroundColor: Color.Primary,
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
            backgroundColor: Color.Primary,
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
    tintColor: Color.TextWhite,
  },
  title: {
    color: Color.TextWhite,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Color.TextWhite,
  },
});
