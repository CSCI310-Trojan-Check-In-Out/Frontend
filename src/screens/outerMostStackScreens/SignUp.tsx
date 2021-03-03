import React from 'react';
import {Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function SignUp({navigation}: {navigation: any}) {
  return (
    <>
      <Text>Signup</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUpInfo');
        }}
        style={{alignSelf: 'center'}}>
        <Text>Sign up detail</Text>
      </TouchableOpacity>
    </>
  );
}
