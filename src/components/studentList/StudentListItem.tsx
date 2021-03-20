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
          flexDirection: 'column',
          justifyContent: 'center',
            alignContent: 'center',
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text style={styles.name}>{student.name}</Text>
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
