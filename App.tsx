/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigators/AppNavigator';
import { Text } from 'react-native';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <AppNavigator />
    </>
  );
};

export default App;
