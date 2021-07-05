import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Vector } from 'react-native-redash';

import { Side } from './Wave';

const { width } = Dimensions.get('screen');
const RADIUS = 25;

interface OnboardingButtonProps {
  position: Vector<Animated.SharedValue<number>>;
  side: Side;
  activeSide: Animated.SharedValue<Side>;
}
type Props = OnboardingButtonProps;

export const OnboardingButton: React.FC<Props> = ({
  position,
  side,
  activeSide,
}) => {
  const isLeft = side === Side.LEFT;
  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: isLeft ? position.x.value - RADIUS * 2 : width - position.x.value,
    top: position.y.value - RADIUS,
    borderRadius: RADIUS,
    width: RADIUS * 2,
    height: RADIUS * 2,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: withTiming(activeSide.value === Side.NONE ? 1 : 0),
    marginLeft: isLeft ? -RADIUS / 2 : RADIUS / 2,
  }));
  return (
    <Animated.View style={style}>
      {isLeft ? (
        <Image
          style={styles.image}
          source={require('assets/images/arrow-right.png')}
        />
      ) : (
        <Image
          style={styles.image}
          source={require('assets/images/arrow-left.png')}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 25,
    width: 40,
  },
});
