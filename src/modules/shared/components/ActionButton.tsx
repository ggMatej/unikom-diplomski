import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
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
        return require('../../../assets/images/add-camera.png');
      }
      case 'gallery': {
        return require('../../../assets/images/add-description.png');
      }
      case 'location': {
        return require('../../../assets/images/add-location.png');
      }
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isDisabled ? isDisabled : false}
        onPress={onPress}
        style={styles.touchableOpacity}
      >
        <Image style={styles.icon} source={getIcon()} />
      </TouchableOpacity>
      <Text style={styles.text}>{buttonText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Color.TextDark,
    borderStyle: 'dashed',
    borderRadius: 55,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: Color.TextDark,
    textTransform: 'uppercase',
    fontFamily: 'Lato-Bold',
    marginTop: 15,
    fontSize: 15,
  },
  disabled: {
    opacity: 0.5,
  },
});
