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
  BackHandler,
} from 'react-native';
import {addBuildingApi} from '../../api/backendApiCalls';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {onChange} from 'react-native-reanimated';

export default function AddLocation({route, navigation}) {
  const [building, setBuilding] = useState();
  const [buildingName, setBuildingName] = useState<string>('');
  const [abbreviation, setAbbreviation] = useState<string>('');
  const [maximumCapacity, setMaximumCapacity] = useState<number>();
  const [address, setAddress] = useState<string>('');
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [showStartTime, setShowStartTime] = useState<boolean>(false);
  const [showEndTime, setShowEndTime] = useState<boolean>(false);

  const [message, setMessage] = useState(
    'Buidling name and capacity are required.',
  );

  function notification() {
    setMessage(
      'New Capacity cannot be smaller than the current number of people in the building!',
    );
  }

  function addBuiding() {
    if (!buildingName || !maximumCapacity) {
      setMessage('Buidling name and capacity cannot be empty!');
    } else if (
      isNaN(maximumCapacity) ||
      maximumCapacity <= 0 ||
      Math.floor(maximumCapacity) != maximumCapacity
    ) {
      setMessage('Capacity should be a positive integer!');
    } else {
      addBuildingApi(
        buildingName,
        abbreviation,
        maximumCapacity,
        address,
        setBuilding,
        notification,
      );

      navigation.navigate('LocationDetail', {building});
    }
  }

  function handleTimeChange(event, selectedDate) {
    console.log(selectedDate);
    let date;
    if (selectedDate) {
      date = new Date(selectedDate);
    }

    if (showStartTime) {
      setShowStartTime(false);
      if (date) setStartTime(date.toTimeString());
    }
    if (showEndTime) {
      setShowEndTime(false);
      if (date) setEndTime(date.toTimeString());
    }
  }

  return (
    <>
      <View style={{display: 'flex', flex: 1, flexGrow: 1}}>
        <ScrollView
          testID="addLocation"
          style={{
            display: 'flex',
            // flexDirection: 'column',
            // justifyContent: 'flex-end',
            // flex: 1,
            // height: '100%',
            // flexGrow: 1,
          }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add Building</Text>
          </View>
          <View style={styles.notificationContainer}>
            <Text testID={message} style={styles.notification}>
              {message}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <TextInput
              testID="addLocationBuildingName"
              style={styles.textInput}
              placeholder={'Full Name'}
              onChangeText={(text) => setBuildingName(text)}
              value={buildingName}
            />
          </View>
          <View style={styles.textContainer}>
            <TextInput
              testID="addLocationCurrentCapacity"
              style={styles.textInput}
              keyboardType="numeric"
              placeholder={'Capacity'}
              onChangeText={setMaximumCapacity}
              value={maximumCapacity}
            />
          </View>
          <View style={styles.textContainer}>
            <TextInput
              testID="addLocationBuildingAbb"
              style={styles.textInput}
              placeholder={'Abbreviation'}
              onChangeText={(text) => setAbbreviation(text)}
              value={abbreviation}
            />
          </View>

          <View style={styles.textContainer}>
            <TextInput
              testID="addLocationAddress"
              style={styles.textInput}
              placeholder={'Address'}
              onChangeText={(text) => setAddress(text)}
              value={address}
            />
          </View>

          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => setShowEndTime(true)}>
              <Text style={styles.textInput}>
                {startTime ? startTime : 'Click to select start time'}
              </Text>
            </TouchableOpacity>
            {showStartTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => setShowStartTime(true)}>
              <Text style={styles.textInput}>
                {endTime ? endTime : 'Click to select end time'}
              </Text>
            </TouchableOpacity>

            {showEndTime && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={'time'}
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              testID="addLocationAdd"
              style={styles.button}
              onPress={addBuiding}>
              <Text style={styles.textButton}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="addLocationCancel"
              onPress={() => navigation.navigate('LocationSearch')}
              style={styles.button}>
              <Text style={styles.textButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    textAlign: 'center',
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor:"black",
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    height: 200,
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
