import React from 'react';
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
export default function SignUp({navigation}: {navigation: any}) {
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

        <View>
          <Text>I am a </Text>
          
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
