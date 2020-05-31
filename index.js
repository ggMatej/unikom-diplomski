import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry, YellowBox } from 'react-native';

import { name as appName } from './app.json';
import { RootNavigator } from './src/modules/navigation';

YellowBox.ignoreWarnings(['Remote debugger']);

const App = () => {
    return <RootNavigator />;
};

AppRegistry.registerComponent(appName, () => App);
