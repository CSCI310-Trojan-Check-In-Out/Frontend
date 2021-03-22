import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import BuildingListItem from './BuiildingListItem';
import {useNavigation} from '@react-navigation/native';

export default function BuildingList({buildings}) {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  function refreshState() {
    setRefresh(!refresh);
  }

  return (
    <>
      <FlatList
        data={buildings}
        extraData={refresh}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LocationDetail', {building: item});
                }}>
                <BuildingListItem
                  building={item}
                  refreshState={refreshState}></BuildingListItem>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
}
