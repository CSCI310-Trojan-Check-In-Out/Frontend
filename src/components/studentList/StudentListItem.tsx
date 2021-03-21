import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context as AppContext} from '../../context/AppContext';

export default function StudentListItem({student}) {
  const {state} = useContext(AppContext);

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text style={styles.name}>{student.username}</Text>
        <Text style={styles.time}>Check In:  {student.enter_time}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  time: {
    fontSize: 14,
    color: '#000',
  },
});
