import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VisitHistory from '../screens/tabNavigatorScreens/VisitHistory';
import VisitHistoryResult from '../screens/visitHistory/VisitHistoryResult';
import StudentProfile from '../screens/locationSearch/StudentProfile';
import {Context as AppContext} from './../context/AppContext';

const Stack = createStackNavigator();

export default function VisitHistoryNavigator() {
  const {state} = useContext(AppContext);

  return (
    <Stack.Navigator
      initialRouteName={
        state.user?.is_admin ? 'VisitHistory' : 'VisitHistoryResult'
      }>
      <Stack.Screen
        options={{headerShown: false}}
        name="VisitHistory"
        component={VisitHistory}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VisitHistoryResult"
        component={VisitHistoryResult}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="StudentProfile"
        component={StudentProfile}
      />  
    </Stack.Navigator>
  );
}
