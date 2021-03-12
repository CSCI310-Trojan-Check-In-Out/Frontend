import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function BuildingListItem({building}) {
  useEffect(() => {
    console.log(building);
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
          padding: 10
        }}>
        <Text>{building.name}</Text>
        <Text> ({building.abbreviation})</Text>
      </View>
    </>
  );
}
