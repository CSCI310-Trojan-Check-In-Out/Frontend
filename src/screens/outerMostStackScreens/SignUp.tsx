import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
// logics
import {useSignUp} from '../../hooks/useSignUp';

// stylings
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignUp({navigation}: {navigation: any}) {
  const [
    isStudent,
    setIsStudent,
    fullName,
    setFullName,
    uscID,
    setUscID,
    email,
    setEmail,
    major,
    setMajor,
  ] = useSignUp();

  return (
    <>
      <ScrollView style={{flex: 1, height: '100%'}}>
        <SafeAreaView style={CommonStyle.outerContainerStyle}>
          {/* title */}
          <Text style={CommonStyle.title}>Connect Your USC Account</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PhotoSelect');
            }}
            style={{
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              height: 300,
              width: '80%',
            }}>
            <Text>Profile Pic</Text>
          </TouchableOpacity>

          {/* inputs */}
          <View style={{width: Theme.CONTAINER_WIDTH_LARGE}}>
            <TextInput
              style={CommonStyle.inputBoxStyle}
              onChangeText={setFullName}
              value={fullName}
              placeholder={'FULL NAME'}
            />
            <TextInput
              style={CommonStyle.inputBoxStyle}
              onChangeText={setUscID}
              value={uscID}
              placeholder={'USC ID'}
            />
            <TextInput
              style={CommonStyle.inputBoxStyle}
              onChangeText={setEmail}
              value={email}
              placeholder={'USC EMAIL'}
            />
            <TextInput
              style={CommonStyle.inputBoxStyle}
              onChangeText={setMajor}
              value={major}
              placeholder={'MAJOR'}
            />
          </View>

          <View
            style={{
              marginTop: 15,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: '40%',
            }}>
            <Text style={{fontSize: Theme.FONT_SIZE_MEDIUM}}>I am a: </Text>
            <View
              style={{
                display: 'flex',
                height: 60,
                justifyContent: 'space-around',
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => setIsStudent(true)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name={
                      !isStudent ? 'radio-button-off-sharp' : 'radio-button-on'
                    }
                    size={17}></Ionicons>
                  <Text style={{marginLeft: 10}}>STUDENT</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  onPress={() => setIsStudent(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name={
                      isStudent ? 'radio-button-off-sharp' : 'radio-button-on'
                    }
                    size={17}></Ionicons>
                  <Text style={{marginLeft: 10}}>MANAGER</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              width: Theme.CONTAINER_WIDTH_MEDIUM,
              height: '10%',
              justifyContent: 'space-evenly',
            }}>
            <Button
              title={'Done'}
              color={Theme.RED_PRIMARY}
              onPress={() => {
                navigation.navigate('TabNavigator');
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
