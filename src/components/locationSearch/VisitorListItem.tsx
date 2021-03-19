import React, {useEffect, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context as AppContext} from '../../context/AppContext';

export default function VisitorListItem({visitor}) {
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
        <Text style={styles.name}>{visitor.name}</Text>
        <Text>USC ID: {visitor.id}</Text>
        <Text>Major: {visitor.major}</Text>
        <Text>Check in: {visitor.checkIn}</Text>
        <Text>Check out: {visitor.checkOut}</Text>
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
