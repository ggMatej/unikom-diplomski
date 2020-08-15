import React from 'react';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Color } from 'global-styles';

export const Reports: React.FC = ({}) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={Color.Primary} />
      <View>
        <Text>Reports screen</Text>
      </View>
    </SafeAreaView>
  );
};
