import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePassword from '../screens/profile/ChangePassword';
import LocationSearch from '../screens/tabNavigatorScreens/LocationSearch';
import Profile from '../screens/tabNavigatorScreens/Profile';
import LocationDetail from '../screens/locationSearch/LocationDetail'

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="LocationSearch"
        component={LocationSearch}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="LocationDetail"
        component={LocationDetail}
      />
    </Stack.Navigator>
  );
}
