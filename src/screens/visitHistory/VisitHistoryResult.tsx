import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import VisitHistoryList from '../../components/visitHistory/VisitHistoryList';
import {getUserVisitHistory} from '../../api/backendApiCalls';
import {Context as AppContext} from '../../context/AppContext';

export default function VisitHistoryResult({route, navigation}) {
  const {state} = useContext(AppContext);
  const [history, setHistory] = useState<any>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getHistory();
  }, [navigation, state.checkedInBuilding]);

  function getHistory() {
    if (route?.params?.results) {
      setHistory(route?.params?.results);
    } else {
      getUserVisitHistory(setHistory);
    }
  }

  return (
    <>
      <View testID="VisitHistoryResult" style={styles.visitorList}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Visit History
        </Text>
        <VisitHistoryList historyList={history} getHistory={getHistory} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    marginTop: '2%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
  visitorList: {
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
    flex: 1,
  },
});
