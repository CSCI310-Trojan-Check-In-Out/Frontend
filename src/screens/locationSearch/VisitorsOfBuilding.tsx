import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import VisitorList from '../../components/locationSearch/VisitorList';
export default function VisitorsOfBuilding() {
  const initialList = [
    {
      name: 'Student A',
      id: '1234567890',
      major: 'Computer Science',
      checkIn: '3/17/2021 4:41pm',
      checkOut: '3/17/2021 6:38pm',
    },
    {
      name: 'Student B',
      id: '1234567890',
      major: 'Architecture',
      checkIn: '3/17/2021 7:23pm',
      checkOut: '3/17/2021 9:54pm',
    },
  ];

  const [visitors, setVisitors] = useState<any>(initialList);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setVisitors(initialList);
  }, []);

  function searchVisitor(query) {
    fetch('');
  }

  return (
    <>
      <View style={styles.visitorList}>
        <VisitorList visitors={visitors} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  searchButton: {
    marginTop: '2%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
  visitorList: {
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
