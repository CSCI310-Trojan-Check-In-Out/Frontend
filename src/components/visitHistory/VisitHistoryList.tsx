import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import VisitHistoryItem from './VisitHistoryItem';

export default function VisitHistoryList({historyList}) {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={historyList}
        keyExtractor={(item) => item.history_id}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('');
                }}>
                <VisitHistoryItem history={item} />
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
}
