import React, {useState,useEffect,useCallback} from 'react';
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
import {getAllLocationsApi,searchVisitHistory} from '../../api/backendApiCalls';
import {NavigationRouteContext} from '@react-navigation/native';
import DropDownMenu from '../../components/DropDownMenu';

export default function VisitHistory({navigation}) {
  const schools=[
    {label: 'Dornsife College of Letters, Arts and Sciences', value: 'Dornsife College of Letters, Arts and Sciences',textStyle:{textAlign:'center'}},
    {label: 'USC School of Architecture', value: 'USC School of Architecture',textStyle:{textAlign:'center'}},
    {label: 'Roski School of Art and Design', value: 'Roski School of Art and Design',textStyle:{textAlign:'center'}},
    {label: 'Iovine and Young Academy for Arts, Technology and the Business of Innovation', value: 'Iovine and Young Academy for Arts, Technology and the Business of Innovation',textStyle:{textAlign:'center'}},
    {label: 'Marshall School of Business', value: 'Marshall School of Business',textStyle:{textAlign:'center'}},
    {label: 'Viterbi School of Engineering', value: 'Viterbi School of Engineering',textStyle:{textAlign:'center'} },
    {label: 'USC School of Cinematic Arts', value:'USC School of Cinematic Arts',textStyle:{textAlign:'center'} },
    {label: 'Annenberg School for Communication and Journalism', value:'Annenberg School for Communication and Journalism',textStyle:{textAlign:'center'} },
    {label: 'Kaufman School of Dance', value:'Kaufman School of Dance',textStyle:{textAlign:'center'} },
    {label: 'USC School of Dramatic Arts', value:'USC School of Dramatic Arts',textStyle:{textAlign:'center'} },
    {label: 'Davis School of Gerontology', value:'Davis School of Gerontology',textStyle:{textAlign:'center'} },
    {label: 'Keck School of Medicine', value:'Keck School of Medicine',textStyle:{textAlign:'center'} },
    {label: 'Thornton School of Music', value:'Thornton School of Music',textStyle:{textAlign:'center'} },
    {label: 'Chan Division of Occupational Science and Occupational Therapy', value:'Chan Division of Occupational Science and Occupational Therapy' ,textStyle:{textAlign:'center'}},
    {label: 'Price School of Public Policy', value:'Price School of Public Policy',textStyle:{textAlign:'center'}},
    {label: 'Pre-professional Emphases', value:'Pre-professional Emphases',textStyle:{textAlign:'center'} },
    ];

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

  const [buildings, setBuildings] = useState<any>([]);
  const [building, onChangeBuilding]=useState('');
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
    building,
    studentId,
    major,
  ) {
    searchVisitHistory(
      {
        studentName: text,
        buildingName:building,
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

  useEffect(() => {
    getBuildings();
  }, [navigation]);

  function getBuildings(){
    getAllLocationsApi('visitHistory', setBuildings); 
  }


  return (
    <>
      <View testID='VisitHistory1'>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {
              'Please search using the searchbar or using the filter buttons below.'
            }
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder={'Enter student name:'}
            query={text}
            changeText={setText}
          />
          <View style={styles.searchButton}>
            <Button
              testID='visitHistorySearchButton'
              color={'#FFC72C'}
              onPress={() =>
                searchStudent(
                  text,
                  startDate,
                  endDate,
                  building,
                  studentID,
                  major,
                )
              }
              title="Search"
            />
          </View>
        </View>
        <View style={styles.button}>
          <Button
            testID='studentIDFilter'
            color={'#9D2235'}
            onPress={showStudentIDInput}
            title="Enter Student ID"
          />
          {showStudentID ? (
            <TextInput
              testID='studentIDInput'
              style={styles.textInput}
              placeholder={'Enter Student ID:'}
              onChangeText={(text) => onChangeStudentID(text)}
              value={studentID}
            />
          ) : null}
        </View>
        <View style={styles.button}>
          <Button
            testID='timeFilter'
            color={'#9D2235'}
            title="Select Time Range"
            onPress={showTimeRangeInput}
          />
        </View>

        {showTimeRange && (
          <View testID='timeInput'>
            <View style={styles.timeRangeContainer}>
              <Text 
              testID='timeText'
              accessibilityValue={{text:'From'}}
              style={styles.timeRange}>
                From {startDate.toISOString().split('T')[0]},{' '}
                {startDate.toTimeString().split('G')[0]}
                to {endDate.toISOString().split('T')[0]},{' '}
                {endDate.toTimeString().split('G')[0]}
              </Text>
            </View>
            <View style={styles.timeRangeButtonContainer}>
              <View style={styles.button}>
                <Button
                  testID='startDateFilter'
                  color={'#808080'}
                  onPress={() => showDatepicker('start')}
                  title="Start Date"
                />
              </View>
              <View style={styles.button}>
                <Button
                  testID='startTimeFilter'
                  color={'#808080'}
                  onPress={() => showTimepicker('start')}
                  title="Start Time"
                />
              </View>
              <View style={styles.button}>
                <Button
                  testID='endDateFilter'
                  color={'#808080'}
                  onPress={() => showDatepicker('end')}
                  title="End Date"
                />
              </View>
              <View style={styles.button}>
                <Button
                  testID='endTimeFilter'
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
            testID='buildingFilter'
            color={'#9D2235'}
            onPress={showBuildingInput}
            title="Select Building"
          />
        </View>
        {showBuilding ? (
          <View style={styles.dropdownContainer}>
            <DropDownMenu items={buildings} 
            placeholder={'Please Select a Building'} setValue={onChangeBuilding}/>
          </View>) : null}
        
        
        <View style={styles.button}>
          <Button
            testID='majorFilter'
            color={'#9D2235'}
            onPress={showMajorInput}
            title="Select Major"
          />
        </View>
        {showMajor ? (
          <View style={styles.dropdownContainer}>
           <DropDownMenu items={schools} 
            placeholder={'Please Select a School'} setValue={onChangeMajor}/>
          </View>) : null}
      </View>
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
  searchContainer:{
    height:50,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:'5%',
    marginTop:'5%',
    justifyContent:'center',
  },
  searchButton: {
    marginTop: '1%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
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
  dropdownContainer:{
    height:200,
  }
});
