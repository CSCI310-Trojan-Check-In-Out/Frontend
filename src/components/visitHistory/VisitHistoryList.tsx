import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, RefreshControl, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import VisitHistoryItem from './VisitHistoryItem';

export default function VisitHistoryList({historyList, getHistory}) {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    if (getHistory) {
      getHistory();
    }
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <ScrollView
        style={{height: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          data={historyList}
          keyExtractor={(item) => item.history_id}
          renderItem={({item, index}) => {
            return (
              <>
                {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('');
                }}> */}
                <VisitHistoryItem history={item} />
                {/* </TouchableOpacity> */}
              </>
            );
          }}
        />
      </ScrollView>
    </>
  );
}
