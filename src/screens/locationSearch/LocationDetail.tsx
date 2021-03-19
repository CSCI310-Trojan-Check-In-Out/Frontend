import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import CommonStyle from '../../style/common.style';
import {useNavigation} from '@react-navigation/native';
import UpdateCapacity from './UpdateCapacity';
import {getQRCodeApi} from '../../api/backendApiCalls';
import {Context as AppContext} from '../../context/AppContext';

export default function LocationDetail({route,navigation}) {  
  const {state, pinQRCode} = useContext(AppContext);
  const [isManager, setIsManager] = useState(true);
  const [image, setImage] = React.useState<string>(
    'https://reactnative.dev/img/tiny_logo.png',
  );

  function pinQRCodeSucceed() {
    getQRCodeApi(route.params.buildingId,pinQRCode);
    Alert.alert("","Successfully Pinnned QR Code to Home")
  }

  return (
    <>
      <View style={CommonStyle.outerContainerStyle}>
        <View
          style={isManager ? styles.titleContainer1 : styles.titleContainer2}>
          <Text style={styles.title}>{'Search Result'}</Text>
        </View>
        <View style={styles.profile}>
          <Image style={styles.profilePicture} source={{uri: image}} />
          <View style={styles.textcontainer}>
            <Text style={styles.name}>{'BuildingName Placeholder'}</Text>
            {isManager ? (
              <Text style={styles.capacity}>
                Current Capacity: {'10'}/{'20'}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {isManager ? (
            <>
              <TouchableOpacity style={styles.button} onPress={pinQRCodeSucceed}>
                <Text style={styles.textButton}>Pin QR Code</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('UpdateCapacity')}>
                <Text style={styles.textButton}>Update Capacity</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Check in</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer1: {
    alignItems: 'center',
    marginTop: '3%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '5%',
    padding: '3%',
  },
  titleContainer2: {
    alignItems: 'center',
    marginTop: '10%',
    marginLeft: '2%',
    marginRight: '2%',
    marginBottom: '5%',
    padding: '3%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profile: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 270,
    height: 270,
    flexDirection: 'row',
  },
  textcontainer: {
    alignItems: 'center',
    margin: 20,
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  capacity: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    height: '30%',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#9D2235',
    width: 200,
    height: 60,
    padding: '2%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});
