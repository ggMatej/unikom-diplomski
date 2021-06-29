import { Color } from 'global-styles';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

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

  return (
    <>
      <StatusBar backgroundColor={Color.Background} />
      <View style={StyleSheet.absoluteFill}>
        {current}
        {prev && (
          <View style={[StyleSheet.absoluteFill]}>
            <Wave side={Side.LEFT}>{prev}</Wave>
          </View>
        )}
        {next && (
          <View style={StyleSheet.absoluteFill}>
            <Wave side={Side.RIGHT}>{next}</Wave>
          </View>
        )}
      </View>
    </>
  );
};
