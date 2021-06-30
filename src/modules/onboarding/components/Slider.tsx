import { Color } from 'global-styles';
import React from 'react';
import { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useVector } from 'react-native-redash';

import { HEIGHT, MARGIN_WIDTH, Side, Wave, WIDTH } from './Wave';

const PREV = WIDTH;
const NEXT = 0;

interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: JSX.Element;
  prev?: JSX.Element;
  next?: JSX.Element;
}

type Props = SliderProps;

export const Slider: React.FC<Props> = ({
  index,
  children: current,
  prev,
  next,
  setIndex,
}) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const zIndex = useSharedValue(0);
  const activeSide = useSharedValue(Side.NONE);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      if (x <= MARGIN_WIDTH && hasPrev) {
        activeSide.value = Side.LEFT;
        zIndex.value = 100;
      } else if (x >= WIDTH - MARGIN_WIDTH && hasNext) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: ({ x, y }) => {
      if (activeSide.value === Side.LEFT) {
        left.x.value = Math.max(x, MARGIN_WIDTH);
        left.y.value = y;
      } else if (activeSide.value === Side.RIGHT) {
        right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH);
        right.y.value = y;
      }
    },
  });

  useEffect(() => {
    left.x.value = withSpring(MARGIN_WIDTH);
    right.x.value = withSpring(MARGIN_WIDTH);
  }, []);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {prev && (
          <View style={[StyleSheet.absoluteFill]}>
            <Wave
              position={left}
              side={Side.LEFT}
              isTransitioning={isTransitioningLeft}
            >
              {prev}
            </Wave>
          </View>
        )}
        {next && (
          <View style={StyleSheet.absoluteFill}>
            <Wave
              position={right}
              side={Side.RIGHT}
              isTransitioning={isTransitioningRight}
            >
              {next}
            </Wave>
          </View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};
