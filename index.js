import React from 'react';
import { AppRegistry, YellowBox, View } from 'react-native';

import { name as appName } from './app.json';

YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
    return <View />;
};

AppRegistry.registerComponent(appName, () => App);
