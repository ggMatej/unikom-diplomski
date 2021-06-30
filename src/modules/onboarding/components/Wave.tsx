import React, { ReactNode } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { Color } from 'global-styles';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Vector } from 'react-native-redash';

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('screen');
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;

// 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
const C = 0.5522847498;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x: number, y: number) => {
  'worklet';
  return { x, y };
};
const curve = (c1: Vector, c2: Vector, to: Vector) => {
  'worklet';
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
};

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

interface WaveProps {
  side: Side;
  children: ReactNode;
  isTransitioning: Animated.SharedValue<boolean>;
  position: Vector<Animated.SharedValue<number>>;
}

type Props = WaveProps;

export const Wave: React.FC<Props> = ({
  side,
  children,
  isTransitioning,
  position: { x, y },
}) => {
  const R = useDerivedValue(() => {
    return Math.min(x.value - MIN_LEDGE, WIDTH / 2);
  });

  const ledge = useDerivedValue(() => {
    const minLedge = interpolate(
      x.value,
      [0, MIN_LEDGE],
      [0, MIN_LEDGE],
      Extrapolate.CLAMP,
    );
    const baseLedge = minLedge + Math.max(0, x.value - MIN_LEDGE - R.value);
    return withSpring(isTransitioning.value ? x.value : baseLedge);
  });

  const animatedProps = useAnimatedProps(() => {
    const d = ['M 0 0', `H ${x.value}`, `V ${HEIGHT}`, 'H 0', 'Z'];
    return {
      d: d.join(' '),
    };
  });

  const maskElement = (
    <Svg
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [{ rotateY: side === Side.RIGHT ? '180deg' : '0deg' }],
        },
      ]}
    >
      <AnimatedPath
        fill={children.props.slide.color}
        animatedProps={animatedProps}
      />
    </Svg>
  );

  const androidStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: isTransitioning.value
            ? withTiming(0)
            : side === Side.RIGHT
            ? WIDTH - ledge.value
            : -WIDTH + ledge.value,
        },
      ],
    };
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      {maskElement}
      <Animated.View style={[StyleSheet.absoluteFill, androidStyle]}>
        {children}
      </Animated.View>
    </View>
  );
};
