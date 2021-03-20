import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context as AppContext} from '../../context/AppContext';

export default function VisitHistoryItem({history}) {
  const {state} = useContext(AppContext);
  useEffect(() => {
    // console.log(state);
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
            alignContent: 'center',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text style={styles.name}>{history.name}</Text>
        <Text>USC ID: {history.id}</Text>
        <Text>Major: {history.major}</Text>
        <Text>Check in: {history.checkIn}</Text>
        <Text>Check out: {history.checkOut}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    name:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
    }
});
