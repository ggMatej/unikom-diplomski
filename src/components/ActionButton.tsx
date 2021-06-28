import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { Color } from 'global-styles';

interface OwnProps {
  onPress: () => void;
  buttonIcon: 'camera' | 'gallery' | 'location';
  buttonText: string;
  isDisabled?: boolean;
}

type Props = OwnProps;

export const ActionButton: React.FC<Props> = ({
  onPress,
  buttonIcon,
  buttonText,
  isDisabled,
}) => {
  function getIcon() {
    switch (buttonIcon) {
      case 'camera': {
        return require('../assets/images/camera.png');
      }
      case 'gallery': {
        return require('../assets/images/text.png');
      }
      case 'location': {
        return require('../assets/images/location.png');
      }
    }
  }
  return (
    <View style={[styles.container, isDisabled ? styles.disabled : null]}>
      <LinearGradient
        colors={[Color.Primary, Color.Secondary]}
        useAngle={true}
        angle={90}
        style={styles.gradient}
      >
        <TouchableOpacity
          disabled={isDisabled ? isDisabled : false}
          onPress={onPress}
          style={styles.touchableOpacity}
        >
          <Image style={styles.icon} source={getIcon()} />
        </TouchableOpacity>
      </LinearGradient>
      <Text style={styles.text}>{buttonText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    tintColor: Color.Background,
  },
  text: {
    color: Color.Primary,
    fontWeight: 'bold',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  disabled: {
    opacity: 0.5,
  },
});
