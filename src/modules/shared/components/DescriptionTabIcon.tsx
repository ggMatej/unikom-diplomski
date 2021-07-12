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

export const DescriptionTabIcon: React.FC<Props> = ({
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
    if (actionIndex === 1) {
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
          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
          stroke={isStepCompleted ? Color.Success : Color.Background}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
          stroke={isStepCompleted ? Color.Success : Color.Background}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};
