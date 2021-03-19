import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import VisitorListItem from './VisitorListItem';
import {useNavigation} from '@react-navigation/native';
import BuildingListItem from './BuiildingListItem';

export default function VisitorList({visitors}) {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={visitors}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LocationDetail');
                }}>
                <VisitorListItem visitor={item} />
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
}
