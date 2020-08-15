import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const HeaderLogo: React.FC = ({}) => {
  return (
    <Image
      style={styles.logo}
      source={require('assets/images/splash-icon.png')}
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 20,
    resizeMode: 'stretch',
  },
});
