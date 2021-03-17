import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function IconButton({iconName, text,press}) {
  
  return (
    <>
      <TouchableOpacity style={styles.background} onPress={press}>
        <Ionicons name={iconName} size={30} style={styles.icon} />
        <View
          style={{
            display: 'flex',
            width: '50%',
            marginLeft: 10
          }}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 150,
    height: 75,
    backgroundColor: '#9D2235',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    color: '#fff',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
});
