import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import BuildingListItem from './BuiildingListItem';
import {useNavigation} from '@react-navigation/native';
import List from '../../components/List';
import {ScrollView} from 'react-native-gesture-handler';

export default function BuildingList({buildings, getBuildings}) {
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);

  function refreshState() {
    setRefresh(!refresh);
  }

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getBuildings();
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
          data={buildings}
          extraData={refresh}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => {
                    console.log(item);
                    if (item.is_deleted === 0) {
                      navigation.navigate('LocationDetail', {building: item});
                    }
                  }}>
                  <BuildingListItem
                    building={item}
                    refreshState={refreshState}></BuildingListItem>
                </TouchableOpacity>
              </>
            );
          }}
        />
      </ScrollView>
    </>
  );
}
