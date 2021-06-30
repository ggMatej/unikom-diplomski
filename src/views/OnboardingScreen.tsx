import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { Color } from 'global-styles';
import { Slide, Slider, slides } from 'modules/onboarding';

export const OnboardingScreen: React.FC = () => {
  const [index, setIndex] = useState(1);
  const prev = slides[index - 1];
  const next = slides[index + 1];
  return (
    <Slider
      key={index}
      index={index}
      setIndex={setIndex}
      prev={prev && <Slide slide={prev} />}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={slides[index]!} />
    </Slider>
  );
};
