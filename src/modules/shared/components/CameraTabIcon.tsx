import { Color } from 'global-styles';
import * as React from 'react';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet, TouchableOpacityBase } from 'react-native';

interface IconProps {
  actionIndex: number;
  isStepCompleted: boolean;
}

type Props = IconProps;

export const CameraTabIcon: React.FC<Props> = ({
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
    if (actionIndex === 0) {
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
          d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z"
          stroke={isStepCompleted ? Color.Success : Color.Background}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12 17a4 4 0 100-8 4 4 0 000 8z"
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
