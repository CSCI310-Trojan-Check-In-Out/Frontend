import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export default function SignUpInfo({navigation}: {navigation: any}) {
  return (
    <>
      <Text>Sign up info</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('TabNavigator');
        }}
        style={{alignSelf: 'center'}}>
        <Text>finish</Text>
      </TouchableOpacity>
    </>
  );
}
