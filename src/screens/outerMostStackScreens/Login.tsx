import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

export default function Login({navigation}: {navigation: any}) {
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'column',
          alignItems: 'center',
          height: '70%',
        }}>
        {/* title */}
        <Text style={{fontWeight: 'bold', fontSize: 40}}>Welcome Back!</Text>

        {/* inputs */}
        <View style={{width: '80%'}}>
          <TextInput style={styles.inputBoxStyle} value={'email'}></TextInput>
          <TextInput
            secureTextEntry={true}
            style={styles.inputBoxStyle}
            value={'password'}></TextInput>
        </View>

        <View
          style={{
            width: '70%',
            height: '20%',
            justifyContent: 'space-evenly',
          }}>
          <Button
            title={'Sign In'}
            color="rgba(153, 0, 0, 1)"
            onPress={() => {
              navigation.navigate('TabNavigator');
            }}
          />

          <Button
            title={'Sign Up'}
            color="rgba(255, 204, 0, 1)"
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputBoxStyle: {
    borderRadius: 30,
    padding: 20,
    height: 60,
    backgroundColor: 'rgba(220, 220, 220, 1)',
    margin: 10,
  },
});
