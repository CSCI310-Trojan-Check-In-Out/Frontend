import React, {useState,useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {removeQRCodeApi} from '../../../api/backendApiCalls';
import {Context as AppContext} from '../../../context/AppContext';
import QRCode from 'react-native-qrcode-svg';

export default function HomeWithQRCode({pinnedBuilding}) {
  
  const {state, removeQRCode} = useContext(AppContext);

  function removeQRCodeSucceed(){
    removeQRCodeApi(removeQRCode);
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Quick Access</Text>
        </View>
        <View style={styles.buildingNameContainer}>
          <Text style={styles.buildingName}>{pinnedBuilding.buildingName}</Text>
        </View>
        <View style={styles.QRCodeContainer}>
          <QRCode value={pinnedBuilding.QRCode} size={200} quietZone={10} />
        </View>
        <TouchableOpacity style={styles.button} onPress={removeQRCodeSucceed}>
          <Text style={styles.textButton}>Remove From Pin</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '10%',
    marginBottom: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  buildingNameContainer: {
    paddingLeft: '10%',
    paddingRight: '10%',
    marginBottom: '7%',
  },
  buildingName: {
    fontSize: 20,
    textAlign: 'center',
  },
  QRCodeContainer: {},
  QRCode: {
    width: '80%',
    height: 270,
  },
  button: {
    backgroundColor: '#9D2235',
    width: '60%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: '10%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});
