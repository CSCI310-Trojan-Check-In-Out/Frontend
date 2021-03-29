import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Image,
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
import {Context as AppContext} from '../../context/AppContext';
import DropDownMenu from '../../components/DropDownMenu';
// api
import {signupApi} from '../../api/backendApiCalls';
import {uploadProfilePic} from '../../api/firebaseApi';
// import {Image} from 'react-native-svg';

export default function SignUp({navigation}: {navigation: any}) {
  const [
    image,
    setImage,
    password,
    setPassword,
    isAdmin,
    setIsAdmin,
    fullName,
    setFullName,
    uscID,
    setUscID,
    email,
    setEmail,
    major,
    setMajor,
    submitForm,
  ] = useSignUp();
  const {state, login} = useContext(AppContext);

  useEffect(() => {
    // log in success
    if (state.user) {
      navigation.navigate('TabNavigator');
    }
  }, [state.user]);

  function submissionSucceedCallback(
    imageData,
    isAdminData,
    fullNameData,
    uscIdData,
    emailData,
    majorData,
    passwordData,
  ) {
    if (imageData) {
      uploadProfilePic(imageData, emailData).then((imageUrl) => {
        signupApi(
          imageUrl,
          isAdminData,
          fullNameData,
          uscIdData,
          emailData,
          majorData,
          passwordData,
          login,
        );
      });
    } else {
      signupApi(
        'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
        isAdminData,
        fullNameData,
        uscIdData,
        emailData,
        majorData,
        passwordData,
        login,
      );
    }
  }

  return (
    <>
      <ScrollView testID="signUpScrollView" style={{flex: 1, height: '100%'}}>
        <SafeAreaView style={CommonStyle.outerContainerStyle}>
          {/* title */}
          <Text style={CommonStyle.title}>Connect Your USC Account</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PhotoSelect', {
                setImage: setImage,
              });
            }}
            style={{
              borderRadius: 50,
              margin: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              height: 300,
              width: '80%',
            }}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 50}}
              source={{
                uri: image
                  ? image
                  : 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg',
              }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>

          {/* inputs */}
          <View style={{width: Theme.CONTAINER_WIDTH_LARGE}}>
            <TextInput
              testID="signUpFullNameTextInput"
              style={CommonStyle.inputBoxStyle}
              onChangeText={setFullName}
              value={fullName}
              placeholder={'FULL NAME'}
            />
            <TextInput
              testID="signUpUSCIDTextInput"
              style={CommonStyle.inputBoxStyle}
              onChangeText={setUscID}
              value={uscID}
              placeholder={'USC ID'}
            />
            <DropDownMenu setSchool={setMajor} />
            <TextInput
              testID="signUpUSCEmailTextInput"
              style={CommonStyle.inputBoxStyle}
              onChangeText={setEmail}
              value={email}
              placeholder={'USC EMAIL'}
            />
            <TextInput
              testID="signUpPasswordTextInput"
              style={CommonStyle.inputBoxStyle}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder={'PASSWORD'}
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
                  testID="signUpStudentRadioButton"
                  onPress={() => setIsAdmin(false)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    testID="signUpStudentRadioButtonIcon"
                    name={
                      isAdmin ? 'radio-button-off-sharp' : 'radio-button-on'
                    }
                    size={17}></Ionicons>
                  <Text style={{marginLeft: 10}}>STUDENT</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                testID="signUpManagerRadioButton"
                  onPress={() => setIsAdmin(true)}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name={
                      !isAdmin ? 'radio-button-off-sharp' : 'radio-button-on'
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
              marginBottom: 20,
              justifyContent: 'space-evenly',
            }}>
            <Button
              testID="signUpDoneButton"
              title={'Done'}
              color={Theme.RED_PRIMARY}
              onPress={() => {
                submitForm(submissionSucceedCallback);
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}
