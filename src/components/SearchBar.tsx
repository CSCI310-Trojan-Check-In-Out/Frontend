import React, {useState} from 'react';
import {View, StyleSheet, Text,Button} from 'react-native';
import {colors, SearchBar} from 'react-native-elements';
import Theme from '../style/theme.style';

export default function CustomSearchBar({placeholder, query, changeText}) {
  

  return (
    <View>
      <SearchBar
        testID='searchBar'
        placeholder={placeholder}
        onChangeText={changeText}
        value={query}
        inputContainerStyle={{backgroundColor: 'white'}}
        containerStyle={{
          backgroundColor: colors.grey4,
          borderWidth: 0,
          borderBottomColor: colors.grey4,
          borderTopColor: colors.grey4,
          marginBottom:'2%',
          width:300,
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({

});