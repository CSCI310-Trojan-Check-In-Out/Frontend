import React, {useEffect, useState,useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import VisitHistoryList from '../../components/visitHistory/VisitHistoryList';
import {getUserVisitHistory} from '../../api/backendApiCalls';
import {Context as AppContext} from '../../context/AppContext';

export default function VisitHistoryResult({navigation}) {
  const {state} = useContext(AppContext);


  const [history, setHistory] = useState<any>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getUserVisitHistory(setHistory);
  },[]);


  return (
    <>
      <View style={styles.visitorList}>
        <VisitHistoryList historyList={history} />
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
  },
});
