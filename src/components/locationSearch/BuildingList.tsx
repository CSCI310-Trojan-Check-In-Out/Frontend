import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import BuildingListItem from './BuiildingListItem';

export default function BuildingList({buildings}) {
  return (
    <>
      <FlatList
        data={buildings}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <BuildingListItem building={item}></BuildingListItem>
            </>
          );
        }}
      />
    </>
  );
}
