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
  const [currentURL, onChangeCurrentURL] = useState('');
  const {setImage} = route.params;

  return (
    <>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Update Photo</Text>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            testID="profilePictureLink"
            style={styles.textInput}
            placeholder={'Please enter your picture URL'}
            onChangeText={(text) => onChangeCurrentURL(text)}
            value={currentURL}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID="profilePictureSubmitURLButton"
            style={styles.button}
            onPress={() => {
              setImage(currentURL);
              navigation.navigate('Profile');
            }}>
            <Text style={styles.textButton}>Submit URL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID="profilePictureUploadPhotoButton"
            style={styles.button}
            onPress={() =>
              navigation.navigate('PhotoSelect', {
                setImage,
                from: 'profilePicture',
              })
            }>
            <Text style={styles.textButton}>Upload Photo</Text>
          </TouchableOpacity>
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
    marginTop: '10%',
    alignItems: 'center',
    height: 200,
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#9D2235',
    width: '60%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});
