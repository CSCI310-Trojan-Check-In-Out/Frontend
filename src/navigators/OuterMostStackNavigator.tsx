import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/outerMostStackScreens/Login';
import SignUp from '../screens/outerMostStackScreens/SignUp';
import PhotoSelect from '../screens/outerMostStackScreens/PhotoSelect'
import TabNavigator from '../navigators/TabNavigator';

const Stack = createStackNavigator();

export default function OuterMostStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TabNavigator"
        component={TabNavigator}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PhotoSelect"
        component={PhotoSelect}
      />
    </Stack.Navigator>
  );
}
