import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePassword from '../screens/profile/ChangePassword';
import ProfilePicture from '../screens/profile/ProfilePicture';

import Profile from '../screens/tabNavigatorScreens/Profile';

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChangePassword"
        component={ChangePassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfilePicture"
        component={ProfilePicture}
      />
    </Stack.Navigator>
  );
}
