import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import IconButton from '../../components/IconButton';
export default function Profile({id, name, uscid, major}) { {/*id from database, different from uscid*/}
  return (
    <>
      <View>
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
            <IconButton iconName={'camera-outline'} text={'Update Photo'} />
            <IconButton iconName={'log-out-outline'} text={'Log out'} />
          </View>
          <View style={styles.row}>
            <IconButton iconName={'close-outline'} text={'Delete Account'} />
            <IconButton iconName={'key-outline'} text={'Change Password'} />
          </View>
        </View>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
  },
  profile:{

  },
  profilePicture:{
    width: 270,
    height: 270,
    flexDirection:'row',
  },
  textcontainer:{
    alignItems: 'center',
    margin:20,
  },
  name:{
    fontSize:30,
    fontWeight:'bold',
  },
  uscid:{
    fontSize:20,
  },
  major:{
    fontSize:20,
  },
  row:{
    marginTop:10,
    marginBottom:10,
    justifyContent:'space-around',
    alignItems: 'center',
    flexDirection:'row',
  },
});

