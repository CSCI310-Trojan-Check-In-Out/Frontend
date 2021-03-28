import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context as AppContext} from '../../context/AppContext';
// firebase
import {
  subscribeBuildingMaximumCapacity,
  unSubscribeBuildingMaximumCapacity,
  subscribeBuildingCurrentCapacity,
  unSubscribeBuildingCurrentCapacity,
} from '../../api/firebaseApi';

export default function BuildingListItem({building, refreshState}) {
  // const {state} = useContext(AppContext);
  const [maximumCapacity, updateMaximumCapacity] = useState(building.capacity);
  const [currentCapacity, updateCurrentCapacity] = useState(
    building.current_numbers,
  );

  useEffect(() => {
    refreshState();
  }, [maximumCapacity, currentCapacity]);

  useEffect(() => {
    // console.log(state);
    subscribeBuildingMaximumCapacity(building.id, updateMaximumCapacity);
    subscribeBuildingCurrentCapacity(building.id, updateCurrentCapacity);
    return () => {
      // unSubscribeBuildingMaximumCapacity(building.id);
      // unSubscribeBuildingCurrentCapacity(building.id);
    };
  }, []);

  return (
    <>
      <View
        testID='buildingListItem'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text>
          {building.place_name} ({building.abbreviation})
        </Text>
        <Text>
          Capacity: {currentCapacity} / {maximumCapacity}
        </Text>
      </View>
    </>
  );
}
