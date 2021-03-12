import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/tabNavigatorScreens/Home';

import LocationSearch from '../screens/tabNavigatorScreens/LocationSearch';

import VisitHistory from '../screens/tabNavigatorScreens/VisitHistory';

import Profile from '../screens/tabNavigatorScreens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      lazy={true}
      // detachInactiveScreens={true}
      tabBarOptions={{
        style: {height:50, padding: 5},
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'LocationSearch') {
            iconName = focused ? 'md-location' : 'md-location-outline';
          } else if (route.name === 'VisitHistory') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} options={{tabBarBadge: 1}} />
      <Tab.Screen name="LocationSearch" component={LocationSearch} />
      <Tab.Screen name="VisitHistory" component={VisitHistory} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
