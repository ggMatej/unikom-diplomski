import Color from 'color';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Svg, { RadialGradient, Defs, Rect, Stop } from 'react-native-svg';
import { Color as AppColors } from 'global-styles';

import { NavigationProps } from 'modules/navigation';
import { useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('screen');
const SIZE = width - 75;

interface SlideProps {
  index?: number;
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}
type Props = SlideProps & NavigationProps<'onboarding'>;

export const Slide: React.FC<Props> = ({
  slide: { picture, color, title, description },
  navigation,
  index,
}) => {
  const lighterColor = Color(color).lighten(0.3).toString();
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  const fadeAnimation = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const wobbleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  function handleOnSkip() {
    navigation.replace('main');
  }

  function handleOnDone() {
    navigation.replace('main');
  }

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });

    function setRotationValue() {
      rotation.value = withSequence(
        withTiming(-10, { duration: 50 }),
        withRepeat(withTiming(10, { duration: 100 }), 6, true),
        withTiming(0, { duration: 50 }),
      );
      setTimeout(() => {
        setRotationValue();
      }, 5000);
    }

    setTimeout(() => {
      setRotationValue();
    }, 5000);
  }, [opacity, rotation]);

  return (
    <>
      <StatusBar hidden={true} />
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="gradient" cx="50%" cy="35%">
            <Stop offset="0%" stopColor={lighterColor} />
            <Stop offset="100%" stopColor={color} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={width} height={height} fill="url(#gradient)" />
      </Svg>
      <View style={styles.container}>
        <Image source={picture} style={styles.image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {index === 0 && (
          <Animated.View style={[styles.skipButtonContainer]}>
            <TouchableOpacity
              style={[styles.skipButton]}
              onPress={handleOnSkip}
            >
              <Image
                style={styles.skipButtonImage}
                source={require('assets/images/arrow-right.png')}
              />
              <Text style={styles.skipButtonText}>PRESKOČI</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        {index === 2 && (
          <Animated.View
            style={[styles.skipButtonContainer, fadeAnimation, wobbleAnimation]}
          >
            <TouchableOpacity style={styles.skipButton} onPress={handleOnDone}>
              <Image
                style={styles.skipButtonImage}
                source={require('assets/images/arrow-right.png')}
              />
              <Text style={styles.skipButtonText}>ZAVRŠI</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    alignItems: 'center',
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
  title: {
    fontSize: 48,
    color: AppColors.TextWhite,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 19,
    color: AppColors.TextWhite,
    textAlign: 'center',
    marginBottom: 80,
    fontFamily: 'Lato-Regular',
  },
  skipButtonContainer: {
    alignSelf: 'flex-end',
  },
  skipButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 0,
    paddingLeft: 0,
  },
  skipButtonText: {
    color: AppColors.TextWhite,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  skipButtonImage: {
    height: 20,
    width: 40,
  },
});
