import React, { useState } from 'react';
import { Slide, Slider, slides } from 'modules/onboarding';
import { NavigationProps } from 'modules/navigation';

export const assets = slides.map(({ picture }) => picture);

type Props = NavigationProps<'onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({ navigation, route }) => {
  const [index, setIndex] = useState(0);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={
        prev && <Slide route={route} navigation={navigation} slide={prev} />
      }
      next={
        next && <Slide route={route} navigation={navigation} slide={next} />
      }
    >
      <Slide
        route={route}
        navigation={navigation}
        slide={slides[index]!}
        index={index}
      />
    </Slider>
  );
};
