import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChangePassword from '../screens/profile/ChangePassword';
import LocationSearch from '../screens/tabNavigatorScreens/LocationSearch';
import Profile from '../screens/tabNavigatorScreens/Profile';
import LocationDetail from '../screens/locationSearch/LocationDetail';
import UpdateCapacity from '../screens/locationSearch/UpdateCapacity';
import VisitorsOfBuilding from '../screens/visitHistory/VisitHistoryResult';

const Stack = createStackNavigator();

export default function LocationNavigator() {
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

      <Stack.Screen
        options={{headerShown: false}}
        name="UpdateCapacity"
        component={UpdateCapacity}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="VisitorsOfBuilding"
        component={VisitorsOfBuilding}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="VisitorsOfBuilding"
        component={VisitorsOfBuilding}
      /> */}
    </Stack.Navigator>
  );
}
