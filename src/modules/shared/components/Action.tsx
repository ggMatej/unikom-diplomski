import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { Color } from 'global-styles';

interface ActionProps {
  onPress: () => void;
  buttonIcon: 'camera' | 'description' | 'location';
  buttonText: string;
  isDisabled?: boolean;
}

type Props = ActionProps;

export const Action: React.FC<Props> = ({
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
      case 'description': {
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
        <View style={styles.imageContainer}>
          <Image style={styles.icon} source={getIcon()} />
        </View>
        <Text style={styles.text}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: Color.TextDark,
    borderStyle: 'dashed',
    borderRadius: 100,
  },
  icon: {
    width: 200,
    height: 200,
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
