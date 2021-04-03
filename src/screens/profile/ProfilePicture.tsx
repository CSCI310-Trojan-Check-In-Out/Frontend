import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import IconButton from '../../components/IconButton';

export default function ProfilePicture({route, navigation}) {

//const [message, setMessage] = useState('Picture updated succefully!');
const [currentURL, onChangeCurrentURL]=useState('');
const {setImage}=route.params;

  return (
    <>
      <View>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>Update Photo</Text>
      </View>
        <View style={styles.textContainer}>
          <TextInput
            testID='profilePictureLink'
            style={styles.textInput}
            placeholder={'Please enter your picture URL'}
            onChangeText={(text) => onChangeCurrentURL(text)}
            onEndEditing={()=>{
                setImage(currentURL);
                navigation.navigate('Profile')}}
            value={currentURL}
          />
        </View>
        <View style={styles.buttonContainer}>
            <IconButton
              iconName={'camera-outline'}
              text={'Upload Photo'}
              press={() => navigation.navigate('PhotoSelect',{setImage})}
            />
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
    notificationContainer: {
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        marginBottom: '5%',
      },
      notification: {
        color: 'red',
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
  });
  