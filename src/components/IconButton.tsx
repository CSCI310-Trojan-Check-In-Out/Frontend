import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function IconButton({iconName, text}) {
  return (
    <>
      <TouchableOpacity style={styles.background}>
        <Ionicons name={iconName} size={45} style={styles.icon} />

        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 150,
    height: 75,
    backgroundColor: '#9D2235',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  icon: {
    color: '#fff',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  text:{
    fontSize: 15,
    fontWeight:'bold',
    color: '#fff',
  }
});
