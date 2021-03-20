import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import StudentList from '../../components/studentList/StudentList';
import {TouchableOpacity} from 'react-native-gesture-handler';
// api
import {getAllStudentsApi} from '../../api/backendApiCalls';

export default function StudentListScreen({route,navigation}) {
  const [building,setBuilding] = useState(route.params.building);
  const [students, setStudents] = useState<any>([]);

  useEffect(() => {
    getAllStudentsApi(building.id, setStudents);
  }, []);

  return (
    <>
      <View style={styles.studentList}>
        <StudentList students={students}/>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  studentList: {
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
