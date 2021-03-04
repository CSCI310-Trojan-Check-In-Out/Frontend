import React from 'react';
import {StyleSheet, View, Text, Icon, TouchableOpacity} from 'react-native';
export default function IconButton({iconName, text}) {
  return (
    <>
      <TouchableOpacity>
        <View>
          <Icon name={iconName} style={styles.icon} />
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 25,
    width: 25,
  },
  text: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
  },
});
