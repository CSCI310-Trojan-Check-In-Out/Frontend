import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function Login({navigation}: {navigation: any}) {
  return (
    <>
      <Text>Login</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TabNavigator');
        }}
        style={{alignSelf: 'center'}}>
        <Text>login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        style={{alignSelf: 'center'}}>
        <Text>Sign up </Text>
      </TouchableOpacity>
    </>
  );
}
