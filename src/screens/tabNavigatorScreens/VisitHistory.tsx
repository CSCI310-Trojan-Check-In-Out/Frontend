import React,{useState} from 'react';
import {Button, Text, View, Platform} from 'react-native';
import ManagerHome from './manager/ManagerHome';
import CommonStyle from '../../style/common.style';
import SearchBar from '../../components/SearchBar';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function VisitHistory() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <>
      <View>
      <SearchBar placeholder={'Enter student name'} />

        <View>
          <Button onPress={showDatepicker} title="Choose Date" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Choose Time" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            display={'spinner'}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      {/* <View style={CommonStyle.outerContainerStyle}> */}

      {/* <ManagerHome withQRCode={true} /> */}
      {/* </View> */}
    </>
  );
}
