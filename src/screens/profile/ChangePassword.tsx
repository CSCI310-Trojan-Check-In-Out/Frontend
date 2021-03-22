import React, {useContext} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

// context
import {Context as AppContext} from '../../context/AppContext';

// tools
import {changePasswordApi} from '../../api/backendApiCalls';

export default function ChangePassword({id, navigation}) {
  const {state} = useContext(AppContext);

  const [currentPassword, onChangeCurrentPassword] = React.useState('');
  const [newPassword, onChangeNewPassword] = React.useState('');
  const [confirmNewPassword, onChangeConfirmNewPassword] = React.useState('');

  const navigate = function (action: string) {
    switch (action) {
      case 'CANCEL':
        navigation.navigate('Profile');
        break;

      default:
        break;
    }
  };

  function changePasswordFail(feedback) {
    if (feedback) {
      Alert.alert('', feedback);
    }
  }

  function changePasswordSucceed() {
    Alert.alert('', 'Successfully changed password.');
  }

  function handleSubmit() {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('', 'Your confirm password does not match your new password');
    } else {
      changePasswordApi(
        state.user?.id,
        currentPassword,
        newPassword,
        changePasswordSucceed,
        changePasswordFail,
      );
    }
  }

  return (
    <>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Change Password</Text>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'Current Password'}
            onChangeText={(text) => onChangeCurrentPassword(text)}
            value={currentPassword}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'New Password'}
            secureTextEntry={true}
            onChangeText={(text) => onChangeNewPassword(text)}
            value={newPassword}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder={'Confirm Password'}
            onChangeText={(text) => onChangeConfirmNewPassword(text)}
            value={confirmNewPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.textButton}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('CANCEL')}
            style={styles.button}>
            <Text style={styles.textButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '15%',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '3%',
    marginBottom: '3%',
    borderRadius: 20,
  },
  textInput: {
    fontSize: 15,
    paddingLeft: '5%',
  },
  buttonContainer: {
    alignItems: 'center',
    height: '30%',
    justifyContent: 'space-evenly',
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#9D2235',
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});
