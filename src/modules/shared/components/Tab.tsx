import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Color } from 'global-styles';

import {
  CameraTabIcon,
  DescriptionTabIcon,
  LocationTabIcon,
} from 'modules/shared';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

const FIRST_ACTION_POSITION = 0;
const SECOND_ACTION_POSITION = width - 110;
const THIRD_ACTION_POSITION = (width - 110) * 2;
const ICON_CONTAINER_WIDTH = 0.7 * width;

interface TabProps {
  onPress: (index: 0 | 1 | 2) => void;
  translateIconY: Animated.SharedValue<number>;
  translateDotX: Animated.SharedValue<number>;
}

type Props = TabProps;

export const Tab: React.FC<Props> = ({
  translateDotX,
  translateIconY,
  onPress,
}) => {
  const cameraStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateIconY.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [-8, 0, 0],
    );

    return {
      transform: [{ translateY }],
    };
  }, []);

  const descriptionStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateIconY.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [0, -8, 0],
    );

    return {
      transform: [{ translateY }],
    };
  }, []);

  const locationStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateIconY.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [0, 0, -8],
    );

    return {
      transform: [{ translateY }],
    };
  }, []);

  const dotStyle = useAnimatedStyle(() => {
    const translate = interpolate(
      translateDotX.value,
      [FIRST_ACTION_POSITION, SECOND_ACTION_POSITION, THIRD_ACTION_POSITION],
      [
        0,
        ICON_CONTAINER_WIDTH / 2 - (ICON_CONTAINER_WIDTH / 6 - 1),
        (ICON_CONTAINER_WIDTH / 3) * 2.5 - 5 - (ICON_CONTAINER_WIDTH / 6 - 5),
      ],
    );

    return {
      transform: [{ translateX: translate }],
    };
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={styles.iconsContainer}>
        <Animated.View style={[cameraStyle]}>
          <TouchableOpacity
            onPress={() => {
              onPress(0);
            }}
          >
            <CameraTabIcon />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[descriptionStyle]}>
          <TouchableOpacity
            onPress={() => {
              onPress(1);
            }}
          >
            <DescriptionTabIcon />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[locationStyle]}>
          <TouchableOpacity
            onPress={() => {
              onPress(2);
            }}
          >
            <LocationTabIcon />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.dotContainer}>
        <Animated.View style={[styles.dot, dotStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  iconsContainer: {
    flex: 2.5,
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  dotContainer: {
    flex: 1,
    width: '70%',
    justifyContent: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: Color.Background,
    borderRadius: 100,
    left: ICON_CONTAINER_WIDTH / 6 - 5,
  },
});
