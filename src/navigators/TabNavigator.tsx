import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/tabNavigatorScreens/Home';

import LocationSearch from '../screens/tabNavigatorScreens/LocationSearch';

import VisitHistory from '../screens/tabNavigatorScreens/VisitHistory';

import Profile from '../screens/tabNavigatorScreens/Profile';

import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={{tabBarBadge: 3}} />
      <Tab.Screen
        name="LocationSearch"
        component={LocationSearch}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen
        name="VisitHistory"
        component={VisitHistory}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{tabBarBadge: 3}}
      />
    </Tab.Navigator>
  );
}
