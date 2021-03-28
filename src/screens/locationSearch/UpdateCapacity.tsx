import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler
} from 'react-native';
import {updateCapacityApi} from '../../api/backendApiCalls';

export default function UpdateCapacity({route, navigation}) {
  const [currentCapacity, setCurrentCapacity] = useState<number>();
  const [building, updateBuilding] = useState(route.params.building);
  const [message, setMessage] = useState(
    'Please enter a positive integer that is great than the current capacity!',
  );
  const [style, setStyle]=useState(false);

  function changeStyle(){
    setStyle(true);
  }

  function restoreStyle(){
    setStyle(false);
  }

  function updateCapacity() {
    setMessage('Capacity successfully updated!');
  }

  function notification() {
    setMessage('New Capacity cannot be smaller than the current number of people in the building!');
  }

  function updateCapacitySucceed() {
    if (!currentCapacity) {
      setMessage('Capacity cannot be empty!');
    } else if (
      isNaN(currentCapacity) ||
      currentCapacity <= 0 ||
      Math.floor(currentCapacity) != currentCapacity
    ) {
      setMessage('Please enter a positive integer!');
    } else {
      updateCapacityApi(
        route.params.building.id,
        currentCapacity,
        updateCapacity,
        notification,
      );
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        testID="updateCapacityScreen"
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {!style&&(
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{building.place_name}</Text>
        </View>)}
        <Text style={styles.capacity}>Capacity:</Text>
        <View style={styles.textContainer}>
          <TextInput
            testID='currentCapacity'
            style={styles.textInput}
            keyboardType="numeric"
            onFocus={changeStyle}
            onEndEditing={restoreStyle}
            onChangeText={setCurrentCapacity}
            value={currentCapacity}
          />
        </View>
        <View style={styles.notificationContainer}>
          <Text testID={message} style={styles.notification}>{message}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Upload CSV File</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            testID='currentCapacityUpdateButton'
            style={styles.button}
            onPress={updateCapacitySucceed}>
            <Text style={styles.textButton}>Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '20%',
    paddingLeft: '10%',
    paddingRight: '10%',
    
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  capacity: {
    marginLeft: '10%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
    marginBottom: '10%',
    borderRadius: 20,
  },
  textInput: {
    width:"100%",
    textAlign:"center",
    fontSize: 15,
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
  buttonContainer: {
    alignItems: 'center',
    height: '30%',
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
