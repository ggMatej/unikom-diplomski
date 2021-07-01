import Color from 'color';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Svg, { RadialGradient, Defs, Rect, Stop } from 'react-native-svg';
import { Color as AppColors } from 'global-styles';

const { width, height } = Dimensions.get('screen');
const SIZE = width - 75;

interface SlideProps {
  slide: {
    color: string;
    title: string;
    description: string;
    picture: ReturnType<typeof require>;
  };
}
type Props = SlideProps;

export const Slide: React.FC<Props> = ({
  slide: { picture, color, title, description },
}) => {
  const lighterColor = Color(color).lighten(0.3).toString();
  return (
    <>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 150,
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
  },
  description: {
    fontSize: 18,
    color: AppColors.TextWhite,
    textAlign: 'center',
  },
});
