import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import StudentListItem from './StudentListItem';

export default function StudentList({students}) {
  const navigation = useNavigation();
  return (
    <>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('StudentProfile',{student:item, from:'studentList'}); 
                }}>
                <StudentListItem student={item}></StudentListItem>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </>
  );
}
