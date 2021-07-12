import { Color } from 'global-styles';
import * as React from 'react';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

interface IconProps {
  actionIndex: number;
  isStepCompleted: boolean;
}

type Props = IconProps;

export const LocationTabIcon: React.FC<Props> = ({
  actionIndex,
  isStepCompleted,
}) => {
  const opacity = useSharedValue(0.3);

  const opacityAnimation = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    if (actionIndex === 2) {
      opacity.value = withTiming(1, {
        duration: 200,
      });
      return;
    }
    opacity.value = withTiming(0.3, {
      duration: 200,
    });
  }, [actionIndex, opacity]);

  return (
    <Animated.View style={[opacityAnimation]}>
      <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
        <Path
          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"
          stroke={isStepCompleted ? Color.Success : Color.Background}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 13a3 3 0 100-6 3 3 0 000 6z"
          stroke={isStepCompleted ? Color.Success : Color.Background}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    opacity: 0.3,
  },
});
