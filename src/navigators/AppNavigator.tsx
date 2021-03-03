import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OuterMostStackNavigator from './OuterMostStackNavigator';
import TabNavigator from './TabNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <OuterMostStackNavigator />
    </NavigationContainer>
  );
}
