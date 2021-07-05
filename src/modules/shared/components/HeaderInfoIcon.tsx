import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Color } from 'global-styles';

import { NavigationProps } from 'modules/navigation';

type Props = NavigationProps<'main'>;

export const HeaderInfoIcon: React.FC<Props> = ({ navigation }) => {
  function onInfoPressed() {
    navigation.replace('onboarding');
  }
  return (
    <TouchableOpacity onPress={onInfoPressed}>
      <Image
        style={styles.infoIcon}
        source={require('assets/images/info-icon.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infoIcon: {
    marginRight: 15,
    tintColor: Color.Secondary,
  },
});
