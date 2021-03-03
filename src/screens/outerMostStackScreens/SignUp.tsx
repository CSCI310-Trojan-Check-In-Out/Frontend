import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SignUp({navigation}: {navigation: any}) {
  const [isStudent, setIsStudent] = useState<boolean>(true);

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
        <Text style={{fontWeight: 'bold', fontSize: Theme.FONT_SIZE_LARGE}}>
          Connect Your USC Account
        </Text>

        {/* inputs */}
        <View style={{width: Theme.CONTAINER_WIDTH_LARGE}}>
          <TextInput style={CommonStyle.inputBoxStyle} value={'email'} />
          <TextInput style={CommonStyle.inputBoxStyle} value={'email'} />
          <TextInput style={CommonStyle.inputBoxStyle} value={'email'} />
          <TextInput style={CommonStyle.inputBoxStyle} value={'major'} />
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
            height: '20%',
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
      </View>
    </>
  );
}
