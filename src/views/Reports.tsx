import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { Color } from 'global-styles';

export const Reports: React.FC = ({}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.Primary} />
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={[Color.Secondary, Color.Primary]}
          useAngle={true}
          angle={90}
          style={styles.topContainerBack}
        >
          <View style={styles.topContainerFront} />
        </LinearGradient>
        <View style={styles.bottomContainerBack}>
          <LinearGradient
            colors={[Color.Secondary, Color.Primary]}
            useAngle={true}
            angle={90}
            style={styles.bottomContainerFront}
          />
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
    flex: 1,
   // backgroundColor: Color.Primary,
  },
  topContainerFront: {
    height: '100%',
    backgroundColor: Color.Background,
    borderBottomRightRadius: 150,
  },
  bottomContainerBack: {
    flex: 1,
    backgroundColor: Color.Background,
  },
  bottomContainerFront: {
    height: '100%',
    // backgroundColor: Color.Primary,
    borderTopLeftRadius: 150,
  },
});
