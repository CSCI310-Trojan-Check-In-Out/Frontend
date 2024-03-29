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

  const schools=[
    {label:'Please Select a School',value:'', textStyle:{textAlign:'center'}},
    {label: 'Dornsife College of Letters, Arts and Sciences', value: 'Dornsife College of Letters, Arts and Sciences',textStyle:{textAlign:'center'}},
    {label: 'USC School of Architecture', value: 'USC School of Architecture',textStyle:{textAlign:'center'}},
    {label: 'Roski School of Art and Design', value: 'Roski School of Art and Design',textStyle:{textAlign:'center'}},
    {label: 'Iovine and Young Academy for Arts, Technology and the Business of Innovation', value: 'Iovine and Young Academy for Arts, Technology and the Business of Innovation',textStyle:{textAlign:'center'}},
    {label: 'Marshall School of Business', value: 'Marshall School of Business',textStyle:{textAlign:'center'}},
    {label: 'Viterbi School of Engineering', value: 'Viterbi School of Engineering',textStyle:{textAlign:'center'} },
    {label: 'USC School of Cinematic Arts', value:'USC School of Cinematic Arts',textStyle:{textAlign:'center'} },
    {label: 'Annenberg School for Communication and Journalism', value:'Annenberg School for Communication and Journalism',textStyle:{textAlign:'center'} },
    {label: 'Kaufman School of Dance', value:'Kaufman School of Dance',textStyle:{textAlign:'center'} },
    {label: 'USC School of Dramatic Arts', value:'USC School of Dramatic Arts',textStyle:{textAlign:'center'} },
    {label: 'Davis School of Gerontology', value:'Davis School of Gerontology',textStyle:{textAlign:'center'} },
    {label: 'Keck School of Medicine', value:'Keck School of Medicine',textStyle:{textAlign:'center'} },
    {label: 'Thornton School of Music', value:'Thornton School of Music',textStyle:{textAlign:'center'} },
    {label: 'Chan Division of Occupational Science and Occupational Therapy', value:'Chan Division of Occupational Science and Occupational Therapy' ,textStyle:{textAlign:'center'}},
    {label: 'Price School of Public Policy', value:'Price School of Public Policy',textStyle:{textAlign:'center'}},
    {label: 'Pre-professional Emphases', value:'Pre-professional Emphases',textStyle:{textAlign:'center'} },
    ];

  const [
    image,
    setImage,
    password,
    setPassword,
    isAdmin,
    setIsAdmin,
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
    firstNameData,
    lastNameData,
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
          firstNameData,
          lastNameData,
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
        firstNameData,
        lastNameData,
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
                from: 'signUp'
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
              testID="signUpFirstNameTextInput"
              style={CommonStyle.inputBoxStyle}
              onChangeText={setFirstName}
              value={firstName}
              placeholder={'FIRST NAME'}
            />
              <TextInput
                  testID="signUpLastNameTextInput"
                  style={CommonStyle.inputBoxStyle}
                  onChangeText={setLastName}
                  value={lastName}
                  placeholder={'LAST NAME'}
              />
            <TextInput
              testID="signUpUSCIDTextInput"
              style={CommonStyle.inputBoxStyle}
              onChangeText={setUscID}
              value={uscID}
              placeholder={'USC ID'}
            />
            <DropDownMenu items={schools} placeholder={"Please Select a School"} setValue={setMajor} />
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
