import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import SearchBar from '../../components/SearchBar';
import BuildingList from '../../components/locationSearch/BuildingList';
export default function LocationSearch() {
  const initialList = [
    {
      name: 'building A',
      abbreviation: 'BA',
      id: 1
    },
    {
      name: 'building B',
      abbreviation: 'BA',
      id: 2
    },
  ];
  const [buildings, setBuildings] = useState<any>(initialList);

  useEffect(() => {
    setBuildings(initialList);
  }, []);

  return (
    <>
      <SearchBar></SearchBar>
      <BuildingList buildings={buildings}></BuildingList>
    </>
  );
}
