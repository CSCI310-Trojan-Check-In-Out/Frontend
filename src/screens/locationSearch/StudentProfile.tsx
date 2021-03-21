import React, {useState,useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
import ConfirmModal from '../../components/ConfirmModal';
import {useNavigation} from '@react-navigation/native';
import CommonStyle from '../../style/common.style';
import {Context as AppContext} from '../../context/AppContext';
import VisitHistoryList from '../../components/visitHistory/VisitHistoryList';

export default function StudentProfile({route}) {
 
  const {state} = useContext(AppContext);
  const {image, name,uscid,major}=route.params.student;
  
  const navigation = useNavigation();

  return (
    <>
      <View style={CommonStyle.outerContainerStyle}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <Image style={styles.profilePicture} source={{uri: image}} />
            <View style={styles.textcontainer}>
              <Text style={styles.name}>Name: {name} </Text>
              <Text style={styles.uscid}>USCID: {uscid} </Text>
              <Text style={styles.major}>Major: {major} </Text>
            </View>
          </View>
          <View>
            
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
