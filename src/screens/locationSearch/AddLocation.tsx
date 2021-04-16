import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler
} from 'react-native';
import { addBuildingApi } from '../../api/backendApiCalls';

export default function AddLocation({route, navigation}) {
  const [building, setBuilding]=useState();
  const [buildingName, setBuildingName] = useState<string>('');
  const [abbreviation, setAbbreviation] = useState<string>('');
  const [maximumCapacity, setMaximumCapacity] = useState<number>();
  const [address, setAddress]=useState<string>('');

  const [message, setMessage] = useState(
    'Buidling name and capacity are required.',
  );

  function notification() {
    setMessage('New Capacity cannot be smaller than the current number of people in the building!');
  }

  function addBuiding(){
    if (!buildingName||!maximumCapacity){
      setMessage('Buidling name and capacity cannot be empty!');
    }
    else if (
      isNaN(maximumCapacity) ||
      maximumCapacity <= 0 ||
      Math.floor(maximumCapacity) != maximumCapacity
    ) {
      setMessage('Capacity should be a positive integer!');
    }
    else{
      addBuildingApi(buildingName, abbreviation,maximumCapacity, address,
        setBuilding, route.params.setBuildings,  notification);
      
      navigation.navigate('LocationDetail',{building});
    }
  }


  return (
    <>
      <View testID='addLocation' 
      style={{display: 'flex',flexDirection: 'column',justifyContent: 'flex-end',}}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Add Building</Text>
        </View>
        <View style={styles.notificationContainer}>
          <Text testID={message} style={styles.notification}>{message}</Text>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            testID='addLocationBuildingName'
            style={styles.textInput}
            placeholder={'Full Name'}
            onChangeText={(text) => setBuildingName(text)}
            value={buildingName}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            testID='addLocationCurrentCapacity'
            style={styles.textInput}
            keyboardType="numeric"
            placeholder={'Capacity'}
            onChangeText={setMaximumCapacity}
            value={maximumCapacity}
          />
        </View>
        <View style={styles.textContainer}>
          <TextInput
            testID='addLocationBuildingAbb'
            style={styles.textInput}
            placeholder={'Abbreviation'}
            onChangeText={(text) => setAbbreviation(text)}
            value={abbreviation}
          />
        </View>
        
        <View style={styles.textContainer}>
          <TextInput
            testID='addLocationAddress'
            style={styles.textInput}
            placeholder={'Address'}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            testID='addLocationAdd' 
            style={styles.button} 
            onPress={addBuiding}>
            <Text style={styles.textButton}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            testID='addLocationCancel'
            onPress={() => navigation.navigate('LocationSearch')}
            style={styles.button}>
            <Text style={styles.textButton}>Cancel</Text>
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
    marginBottom: '10%',
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
    textAlign:'center',
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