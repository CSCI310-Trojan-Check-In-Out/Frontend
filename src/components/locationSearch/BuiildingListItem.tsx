import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context as AppContext} from '../../context/AppContext';

export default function BuildingListItem({building}) {
  const {state} = useContext(AppContext);
  useEffect(() => {
    // console.log(state);
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text>{building.name}</Text>
        <Text> ({building.abbreviation})</Text>
      </View>
    </>
  );
}
