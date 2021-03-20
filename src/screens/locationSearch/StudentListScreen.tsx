import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import StudentList from '../../components/studentList/StudentList';
import {TouchableOpacity} from 'react-native-gesture-handler';
// api
import {getAllLocationsApi} from '../../api/backendApiCalls';

export default function StudentListScreen() {
  const [students, setStudents] = useState<any>([]);

  return (
    <>
      <View style={styles.buildingList}>
        <StudentList students={students}/>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  buildingList: {
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
