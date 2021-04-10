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
          margin: 10,
          borderBottomWidth: 1,
          padding: 10,
        }}>
        {history.full_name ? (
          <Text style={styles.name}>{history.full_name}</Text>
        ) : null}
        <Text>Location: {history.place_name}</Text>
        <Text>Check in: {history.enter_time}</Text>
        <Text>Check out: {history.leave_time}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
});
