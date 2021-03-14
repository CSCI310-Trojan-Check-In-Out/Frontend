import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SearchBar from '../../components/SearchBar';
import BuildingList from '../../components/locationSearch/BuildingList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function LocationSearch() {
  const initialList = [
    {
      name: 'building A',
      abbreviation: 'BA',
      id: 1,
    },
    {
      name: 'building B',
      abbreviation: 'BA',
      id: 2,
    },
  ];
  const [buildings, setBuildings] = useState<any>(initialList);

  useEffect(() => {
    setBuildings(initialList);
  }, []);

  return (
    <>
      <SearchBar placeholder={'Enter a building to search'} />
      <BuildingList buildings={buildings}></BuildingList>
      <View style={{position: 'absolute', bottom: '20%', right: '5%'}}>
        <TouchableOpacity style={{
          backgroundColor:"rgba(0,0,0,0.2)",
          padding: 15,
          borderRadius: 50
        }}>
          <AntDesign name={'addfile'} size={30}></AntDesign>
        </TouchableOpacity>
      </View>
    </>
  );
}
