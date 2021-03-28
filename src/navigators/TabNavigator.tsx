import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/tabNavigatorScreens/Home';

import LocationSearch from '../screens/tabNavigatorScreens/LocationSearch';
import LocationNavigator from './LocationNavigator';
import VisitHistory from '../screens/tabNavigatorScreens/VisitHistory';
import VisitHistoryResult from '../screens/visitHistory/VisitHistoryResult';
import Profile from '../screens/tabNavigatorScreens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileNavigator from './ProfileNavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context as AppContext} from './../context/AppContext';
import VisitHistoryNavigator from './VisitHistoryNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const {state} = useContext(AppContext);

  return (
    <Tab.Navigator
      // lazy={true}
      detachInactiveScreens={true}
      tabBarOptions={{
        style: {height: 50, padding: 5},
      }}
      screenOptions={({route}) => ({
        tabBarTestID: route.name,
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
      <Tab.Screen name="Home" component={Home} />
      {state.user?.is_admin ? (
        <Tab.Screen name="LocationSearch" component={LocationNavigator} />
      ) : null}

      <Tab.Screen name="VisitHistory" component={VisitHistoryNavigator} />

      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
