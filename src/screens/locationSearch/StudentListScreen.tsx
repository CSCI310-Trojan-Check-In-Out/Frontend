import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import StudentList from '../../components/studentList/StudentList';
import {TouchableOpacity} from 'react-native-gesture-handler';
// api
import {getAllStudentsApi} from '../../api/backendApiCalls';

export default function StudentListScreen({route,navigation}) {
  const [building,setBuilding] = useState(route.params.building);
  const [students, setStudents] = useState<any>([]);

  /* for testing only
  const students=[{
    id:1,
    image:'https://reactnative.dev/img/tiny_logo.png',
    name:'Henry',
    uscid:'24',
    major:'CS',
  },
  {
    id:1,
    image:'https://reactnative.dev/img/tiny_logo.png',
    name:'John',
    uscid:'24',
    major:'CS',
  
  }
  
]*/
    
  
  useEffect(() => {
    getAllStudentsApi(building.id, setStudents);
  }, [navigation]);

  return (
    <>
      <View testID="studentListScreen" style={styles.titleContainer}>
        <Text style={styles.title}>{building.place_name}</Text>
      </View>
      <View style={styles.studentList}>
        <StudentList students={students}/>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  studentList: {
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
