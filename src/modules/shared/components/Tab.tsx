import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import {
  CameraTabIcon,
  DescriptionTabIcon,
  LocationTabIcon,
} from 'modules/shared';

export const Tab: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <CameraTabIcon />
      </TouchableOpacity>
      <TouchableOpacity>
        <DescriptionTabIcon />
      </TouchableOpacity>
      <TouchableOpacity>
        <LocationTabIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
