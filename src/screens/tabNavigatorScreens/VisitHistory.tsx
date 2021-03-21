import React, {useState} from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import ManagerHome from './manager/ManagerHome';
import CommonStyle from '../../style/common.style';
import SearchBar from '../../components/SearchBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {searchVisitHistory} from '../../api/backendApiCalls';
import {NavigationRouteContext} from '@react-navigation/native';
export default function VisitHistory({navigation}) {
  const [text, setText] = useState('');
  const [startEnd, setStartEnd] = useState('');
  const [startDate, setStartDate] = useState(new Date(1900, 0, 1));
  const [endDate, setEndDate] = useState(new Date(2100, 11, 31));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [showTimeRange, setShowTimeRange] = useState(false);
  const [showBuilding, setShowBuilding] = useState(false);
  const [showStudentID, setShowStudentID] = useState(false);
  const [showMajor, setShowMajor] = useState(false);

  const [buildingName, onChangeBuildingName] = useState('');
  const [studentID, onChangeStudentID] = useState('');
  const [major, onChangeMajor] = useState('');

  function onChange(event, selectedDate, startEnd) {
    setShow(false);

    if (startEnd === 'start') {
      const currentDate = selectedDate || startDate;
      setStartDate(currentDate);
    } else {
      const currentDate = selectedDate || endDate;
      setEndDate(currentDate);
    }
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  function showDatepicker(startEnd: string) {
    if (startEnd === 'start') {
      setStartEnd('start');
    } else {
      setStartEnd('end');
    }
    showMode('date');
  }

  function showTimepicker(startEnd: string) {
    if (startEnd === 'start') {
      setStartEnd('start');
    } else {
      setStartEnd('end');
    }
    showMode('time');
  }

  const showTimeRangeInput = () => {
    setShowTimeRange(!showTimeRange);
  };

  const showBuildingInput = () => {
    setShowBuilding(!showBuilding);
  };

  const showStudentIDInput = () => {
    setShowStudentID(!showStudentID);
  };

  const showMajorInput = () => {
    setShowMajor(!showMajor);
  };

  function searchStudent(
    text,
    startTime,
    endTime,
    buildingName,
    studentId,
    major,
  ) {
    searchVisitHistory(
      {
        buildingName,
        studentId,
        major,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
      searchSucceedCallback,
    );
  }

  function searchSucceedCallback(results) {
    navigation.navigate('VisitHistoryResult', {results: results});
  }

  return (
    <>
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {
              'Please search using the searchbar or using the filter buttons below.'
            }
          </Text>
        </View>
        <SearchBar
          placeholder={'Enter student name:'}
          query={text}
          changeText={setText}
        />
        <View style={styles.button}>
          <Button
            color={'#9D2235'}
            title="Choose Time Range"
            onPress={showTimeRangeInput}
          />
        </View>

        {showTimeRange && (
          <View>
            <View style={styles.timeRangeContainer}>
              <Text style={styles.timeRange}>
                From {startDate.toISOString().split('T')[0]},{' '}
                {startDate.toTimeString().split('G')[0]}
                to {endDate.toISOString().split('T')[0]},{' '}
                {endDate.toTimeString().split('G')[0]}
              </Text>
            </View>
            <View style={styles.timeRangeButtonContainer}>
              <View style={styles.button}>
                <Button
                  color={'#808080'}
                  onPress={() => showDatepicker('start')}
                  title="Start Date"
                />
              </View>
              <View style={styles.button}>
                <Button
                  color={'#808080'}
                  onPress={() => showTimepicker('start')}
                  title="Start Time"
                />
              </View>
              <View style={styles.button}>
                <Button
                  color={'#808080'}
                  onPress={() => showDatepicker('end')}
                  title="End Date"
                />
              </View>
              <View style={styles.button}>
                <Button
                  color={'#808080'}
                  onPress={() => showTimepicker('end')}
                  title="End Time"
                />
              </View>
            </View>
          </View>
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            display={'spinner'}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) =>
              onChange(event, selectedDate, startEnd)
            }
          />
        )}
        <View style={styles.button}>
          <Button
            color={'#9D2235'}
            onPress={showBuildingInput}
            title="Enter Building Name"
          />
          {showBuilding ? (
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Building Name:'}
              onChangeText={(text) => onChangeBuildingName(text)}
              value={buildingName}
            />
          ) : null}
        </View>
        <View style={styles.button}>
          <Button
            color={'#9D2235'}
            onPress={showStudentIDInput}
            title="Enter Student ID"
          />
          {showStudentID ? (
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Student ID:'}
              onChangeText={(text) => onChangeStudentID(text)}
              value={studentID}
            />
          ) : null}
        </View>
        <View style={styles.button}>
          <Button
            color={'#9D2235'}
            onPress={showMajorInput}
            title="Enter Major"
          />
          {showMajor ? (
            <TextInput
              style={styles.textInput}
              placeholder={'Enter Major:'}
              onChangeText={(text) => onChangeMajor(text)}
              value={major}
            />
          ) : null}
        </View>
        <View style={styles.searchButton}>
          <Button
            color={'#FFC72C'}
            onPress={() =>
              searchStudent(
                text,
                startDate,
                endDate,
                buildingName,
                studentID,
                major,
              )
            }
            title="Search"
          />
        </View>
      </View>
      {/* <View style={CommonStyle.outerContainerStyle}> */}

      {/* <ManagerHome withQRCode={true} /> */}
      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: '3%',
    marginLeft: '2%',
    marginRight: '2%',
    padding: '3%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  timeRangeContainer: {
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  timeRangeButtonContainer: {
    paddingLeft: '1%',
    paddingRight: '1%',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeRange: {
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
  textInput: {
    fontSize: 15,
    paddingLeft: '5%',
  },
  searchButton: {
    marginTop: '20%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
