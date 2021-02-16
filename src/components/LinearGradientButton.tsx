import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import { Color } from 'global-styles';

interface LinearGradientButtonProps {
  placeholder: string;
  onPress: () => void;
  type: 'cancel' | 'primary';
}

type Props = LinearGradientButtonProps;

export const LinearGradientButton: React.FC<Props> = ({
  placeholder,
  onPress,
  type,
}) => {
  function getGradientColors() {
    switch (type) {
      case 'primary': {
        return [Color.Primary, Color.Secondary];
      }
      case 'cancel': {
        return [Color.Error, Color.Warning];
      }
    }
  }
  return (
    <LinearGradient
      style={styles.gradientContainer}
      colors={getGradientColors()}
      useAngle={true}
      angle={90}
    >
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
        <Text style={[styles.text]}>{placeholder}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    backgroundColor: Color.Primary,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 50,
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: Color.TextWhite,
  },
  textCancel: { color: Color.Error },
  textPrimary: { color: Color.Primary },
});
