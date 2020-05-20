import React from 'react';
import { AppRegistry, YellowBox, Text, View } from 'react-native';

import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
    return (
        <View>
            <Text>Yoyo</Text>
        </View>
    );
};

AppRegistry.registerComponent(appName, () => App);
