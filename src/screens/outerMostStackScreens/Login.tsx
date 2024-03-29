/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
// context
import {Context as AppContext} from '../../context/AppContext';

// tools
import {
  emailRegexCheck,
  notEmpty,
  alertError,
} from '../../helpers/inputHelpers';
import {signinApi} from '../../api/backendApiCalls';
// styles
import CommonStyle from '../../style/common.style';
import Theme from '../../style/theme.style';

export default function Login({navigation}: {navigation: any}) {
  const {state, login} = useContext(AppContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // log in success
    if (state.user) {
      navigation.navigate('TabNavigator');
    }
  }, [state.user]);

  function signin() {
    if (inputCheck()) {
      signinApi(email, password, loginSucceed, loginFail);
      // navigation.navigate('TabNavigator');
    }
  }

  function loginSucceed(userData: any) {
    login(userData);
  }
  function loginFail() {
    alertError('login failed');
  }

  function inputCheck() {
    if (!notEmpty([email, password])) {
      alertError('field(s) cannot be empty');
      return false;
    }
    if (!emailRegexCheck(email)) {
      alertError('must be usc email');
      return false;
    }
    return true;
  }

  return (
    <>
      <View
        testID="loginScreen"
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
        <View style={{width: Theme.CONTAINER_WIDTH_LARGE}}>
          <TextInput
            testID="loginEmail"
            style={CommonStyle.inputBoxStyle}
            onChangeText={setEmail}
            value={email}
            placeholder={'USC EMAIL'}
          />
          <TextInput
            testID="loginPassword"
            secureTextEntry={true}
            onChangeText={setPassword}
            style={CommonStyle.inputBoxStyle}
            placeholder={'PASSWORD'}
            value={password}
          />
        </View>

        <View
          style={{
            width: Theme.CONTAINER_WIDTH_MEDIUM,
            height: '20%',
            justifyContent: 'space-evenly',
          }}>
          <Button
            testID="loginButton"
            title={'Sign In'}
            color={Theme.RED_PRIMARY}
            onPress={signin}
          />

          <Button
              testID="signUpButton"
            title={'Sign Up'}
            color={Theme.YELLOW_PRIMARY}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
