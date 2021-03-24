import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {colors, SearchBar} from 'react-native-elements';
import Theme from '../style/theme.style';

export default function List({data, renderItem}) {
  return (
    <View>
      {data.map((item: any) => {
        return renderItem({item});
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
