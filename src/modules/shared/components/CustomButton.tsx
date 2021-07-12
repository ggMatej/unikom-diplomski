import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Color } from 'global-styles';
import Animated from 'react-native-reanimated';

interface LinearGradientButtonProps {
  placeholder: string;
  onPress: () => void;
  type: 'cancel' | 'primary';
}

type Props = LinearGradientButtonProps;

export const CustomButton: React.FC<Props> = ({
  placeholder,
  onPress,
  type,
}) => {
  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          type === 'primary' ? styles.primary : styles.cancel,
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.buttonText,
            type === 'primary' ? styles.primaryText : styles.cancelText,
          ]}
        >
          {placeholder.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Lato-Bold',
  },
  cancel: {
    borderBottomColor: Color.Error,
  },
  cancelText: {
    color: Color.Error,
  },
  primaryText: {
    color: Color.TextDark,
  },
  primary: {
    borderBottomColor: Color.TextDark,
  },
});
