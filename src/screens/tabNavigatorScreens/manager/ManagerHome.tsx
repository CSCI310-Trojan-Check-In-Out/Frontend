import React from 'react';
import {StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import HomeWithQRCode from '../../../components/home/manager/HomeWithQRCode';
import HomeWithoutQRCode from '../../../components/home/manager/HomeWithoutQRCode';

export default function ManagerHome({withQRCode}) { 

  return (
    <>
    <View style={styles.container}>
      {withQRCode?
      (<HomeWithQRCode buildingName={'SAL'}/>):
      (<HomeWithoutQRCode/>)}
    </View>  
      
    </>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
  });

