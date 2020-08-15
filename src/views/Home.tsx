import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Color } from 'global-styles';

export const Home: React.FC = ({}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.Text} />
      <View>
        <Text>Home screen</Text>
      </View>
    </SafeAreaView>
  );
};
