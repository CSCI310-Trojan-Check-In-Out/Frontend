import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
import ConfirmModal from '../../components/ConfirmModal';
import { useNavigation } from '@react-navigation/native';

export default function Profile({name, uscid, major}) {
  {
    /*id from database, different from uscid*/
  }
  const [showModal,setShowModal]=React.useState(false);
  const [modalTitle, setModalTitle]=React.useState('');
  const [modalMessage, setModalMessage]=React.useState('');

  const navigation=useNavigation();

  function decline(){
    setShowModal(false);
  }
  
  function accept(){
    fetch('');
  }

  function press(purpose){
    if (purpose==='updatePhoto'){
      navigation.navigate('photoAlbum');
    }
    else if (purpose==='logOut'){
      setModalMessage('Do you want to log out?');
      setShowModal(true);
    }
    else if (purpose==='deleteAccount'){
      setModalMessage('Do you want to delete account?')
      setShowModal(true);
    }
    else{
      navigation.navigate('ChangePassword');
    }
}
  return (
    <>
      <View>
        <ConfirmModal setShowModal={showModal} 
        title={modalTitle}
        message={modalMessage}
        decline={()=>decline()}
        accept={()=>accept()}/>
        
        <Text>Profile</Text>
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image
              style={styles.profilePicture}
              source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            />
            <View style={styles.textcontainer}>
              <Text style={styles.name}>Name: {name}</Text>
              <Text style={styles.uscid}>USCID: {uscid} </Text>
              <Text style={styles.major}>Major: {major} </Text>
            </View>
          </View>
          <View style={styles.row}>
            <IconButton iconName={'camera-outline'} text={'Update Photo' } press={()=>press('updatePhoto')}  />
            <IconButton iconName={'log-out-outline'} text={'Log out'} press={()=>press('logOut')} />
          </View>
          <View style={styles.row}>
            <IconButton iconName={'close-outline'} text={'Delete Account'} press={()=>press('deleteAccount')} />
            <IconButton iconName={'key-outline'} text={'Change Password'} press={()=>press('changePassword')} />
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
