import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
import ConfirmModal from '../../components/ConfirmModal';
import {useNavigation} from '@react-navigation/native';
import CommonStyle from '../../style/common.style';

export default function Profile({name, uscid, major}) {
  {
    /*id from database, different from uscid*/
  }
  const [showModal, setShowModal] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalMessage, setModalMessage] = React.useState();
  const [image, setImage] = React.useState<string>(
    'https://reactnative.dev/img/tiny_logo.png',
  );
  const navigation = useNavigation();

  function decline() {
    setShowModal(false);
  }

  function accept() {
    // fetch('');
    setShowModal(false);
  }

  function press(purpose: string) {
    if (purpose === 'updatePhoto') {
      navigation.navigate('PhotoSelect', {setImage});
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
      <View style={CommonStyle.outerContainerStyle}>
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
            <Image style={styles.profilePicture} source={{uri: image}} />
            <View style={styles.textcontainer}>
              <Text style={styles.name}>Name: {name}</Text>
              <Text style={styles.uscid}>USCID: {uscid} </Text>
              <Text style={styles.major}>Major: {major} </Text>
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
  },
  profile: {},
  profilePicture: {
    width: 270,
    height: 270,
    flexDirection: 'row',
  },
  textcontainer: {
    alignItems: 'center',
    margin: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  uscid: {
    fontSize: 20,
  },
  major: {
    fontSize: 20,
  },
  row: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
