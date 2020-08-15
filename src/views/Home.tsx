import React from 'react';
import { StatusBar, StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Color } from 'global-styles';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export const Home: React.FC = ({}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.Text} />
      <View style={styles.mainContainer}>
        <View style={styles.topContainerBack}>
          <View style={styles.topContainerFront} />
        </View>
        <View style={styles.bottomContainerBack}>
          <View style={styles.bottomContainerFront} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Color.Secondary,
  },
  topContainerBack: {
    flex: 7,
    backgroundColor: Color.Primary,
  },
  topContainerFront: {
    height: '100%',
    backgroundColor: Color.Background,
    borderBottomRightRadius: 55,
  },
  bottomContainerBack: {
    flex: 1,
    backgroundColor: Color.Background,
  },
  bottomContainerFront: {
    height: '100%',
    backgroundColor: Color.Primary,
  },
});
