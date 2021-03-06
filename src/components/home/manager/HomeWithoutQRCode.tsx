import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function HomeWithoutQRCode() { 

  return (
    <>
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome!</Text>
      </View>
      <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>You can pin the QR code 
          of a building to this screen for quick access.</Text>
      </View>
      <View style={styles.paragraphContainer}>
          <Text style={styles.paragraph}>Press the second icon in the bottom 
          nevigation bar to search for a building.</Text>
      </View>
    </View>  
      
    </>
  );
}

const styles = StyleSheet.create({
    titleContainer:{
      alignItems:'center',
      marginTop:'20%',
      marginBottom:'20%',
      paddingLeft:'10%',
      paddingRight:'10%'
    },
    title:{
      fontSize:40,
      fontWeight:'bold',
    },
    paragraphContainer:{
      alignItems:'center',
      paddingLeft:'10%',
      paddingRight:'10%',
      marginTop:'10%',
      marginBottom:'10%',
    },
    paragraph:{
      fontSize:25,
      fontWeight:'bold',
    }
  });

