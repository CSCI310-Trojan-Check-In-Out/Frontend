import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
import ConfirmModal from '../../components/ConfirmModal';
import {useNavigation} from '@react-navigation/native';
import {uploadProfilePic} from './../../api/firebaseApi';
// tools
import {
  logoutApi,
  deleteAccountApi,
  changeProfileImageApi,
} from '../../api/backendApiCalls';

// context
import {Context as AppContext} from '../../context/AppContext';

// style
import CommonStyle from '../../style/common.style';

export default function Profile({name, uscid, major}) {
  {
    /*id from database, different from uscid*/
  }
  const {state, logout, deleteAccount, changeProfileImage} = useContext(
    AppContext,
  );
  const [purpose, setPurpose] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalMessage, setModalMessage] = React.useState();
  const [image, setImage] = React.useState<string>(
    state.user?.picture ?? 'https://reactnative.dev/img/tiny_logo.png',
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (!state.user) {
      navigation.navigate('Login');
    }
  }, [state]);

  useEffect(() => {
    if (image !== state.user?.picture) {
      uploadProfilePic(image, state?.user?.email).then((url) => {
        changeProfileImageApi(url, changeProfileImage);
      });
    }
  }, [image]);

  function decline() {
    setPurpose('');
    setShowModal(false);
  }

  function accept() {
    switch (purpose) {
      case 'updatePhoto':
        break;
      case 'logOut':
        logoutApi(logout, null);
        break;
      case 'deleteAccount':
        deleteAccountApi(state.user?.id, deleteAccount, null);
        break;
      case 'ChangePassword':
        break;
      default:
        break;
    }
    setPurpose('');
    // fetch('');
    setShowModal(false);
  }

  function press(purpose: string) {
    setPurpose(purpose);
    if (purpose === 'updatePhoto') {
      navigation.navigate('ProfilePicture', {setImage});
    } else if (purpose === 'logOut') {
      setModalMessage('Do you want to log out?');
      setShowModal(true);
    } else if (purpose === 'deleteAccount') {
      setModalMessage('Do you want to delete account?');
      setShowModal(true);
    } else {
      navigation.navigate('ChangePassword');
    }
  }

  return (
    <>
      <View testID="Profile1" style={CommonStyle.outerContainerStyle}>
        {showModal ? (
          <ConfirmModal
            setShowModal={showModal}
            title={modalTitle}
            message={modalMessage}
            decline={() => decline()}
            accept={() => accept()}
          />
        ) : null}

        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              testID="profileImage"
              style={styles.profilePicture}
              source={{uri: image}}
            />
            <View style={styles.textcontainer}>
              <Text style={styles.name}>{state.user?.username}</Text>
              <Text style={styles.uscid}>USCID: {state.user?.usc_id} </Text>
              <Text style={styles.major}>Major: {state.user?.major} </Text>
              <Text style={styles.checkedin}>
                Currently Checking in:{' '}
                {state.checkedInBuilding?.place_name ?? 'N/A'}
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <IconButton
              iconName={'camera-outline'}
              text={'Update Photo'}
              press={() => press('updatePhoto')}
            />
            <IconButton
              iconName={'log-out-outline'}
              text={'Log out'}
              press={() => press('logOut')}
            />
          </View>
          <View style={styles.row}>
            <IconButton
              iconName={'close-outline'}
              text={'Delete Account'}
              press={() => press('deleteAccount')}
            />
            <IconButton
              iconName={'key-outline'}
              text={'Change Password'}
              press={() => press('changePassword')}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 280,
    height: 280,
    borderRadius: 50,
    flexDirection: 'row',
  },
  textcontainer: {
    alignItems: 'center',
    margin: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
  },
  uscid: {
    fontSize: 15,
  },
  major: {
    fontSize: 15,
  },
  checkedin: {
    fontSize: 15,
    textAlign: 'center',
  },
  row: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
