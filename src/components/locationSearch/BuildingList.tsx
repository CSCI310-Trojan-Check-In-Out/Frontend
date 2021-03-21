import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import BuildingListItem from './BuiildingListItem';
import {useNavigation} from '@react-navigation/native';

export default function BuildingList({buildings}) {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={buildings}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity onPress={
                ()=>{navigation.navigate('LocationDetail', {building:item})}
              }>
                <BuildingListItem building={item}></BuildingListItem>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
}
