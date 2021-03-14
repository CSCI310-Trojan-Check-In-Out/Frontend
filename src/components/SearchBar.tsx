import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors, SearchBar} from 'react-native-elements';
import Theme from '../style/theme.style';

export default function CustomSearchBar({placeholder, submitSearch}) {
  const [query, setQuery] = useState('');

  return (
    <SearchBar
      placeholder={placeholder}
      onChangeText={setQuery}
      onSubmitEditing={submitSearch}
      value={query}
      inputContainerStyle={{backgroundColor: 'white'}}
      containerStyle={{
        backgroundColor: colors.grey4,
        borderWidth: 0,
        borderBottomColor: colors.grey4,
        borderTopColor: colors.grey4,
        marginBottom:'2%',
      }}
    />
  );
}
