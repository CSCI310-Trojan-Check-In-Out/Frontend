import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet,Button} from 'react-native';
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
  const [query, setQuery] = useState('');

  useEffect(() => {
    setBuildings(initialList);
  }, []);

  function searchBuilding(query){
    fetch('');
  }

  return (
    <>
      <SearchBar placeholder={'Enter a building to search'} changeText={setQuery}/>
      <View style={styles.searchButton}>
        <Button color={'#FFC72C'} onPress={()=>searchBuilding(query)} title="Search" />
      </View>
      <View style={styles.buildingList}>
        <BuildingList buildings={buildings}></BuildingList>
      </View>
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

const styles = StyleSheet.create({
  searchButton:{
    marginTop:'2%',
    marginBottom:'1%',
    marginLeft:'2%',
    marginRight:'2%',
    borderRadius:20,
  },
  buildingList:{
    backgroundColor:'#fff',
    marginTop:'5%',
    marginBottom:'1%',
    marginLeft:'2%',
    marginRight:'2%',
    borderRadius:20,
  }
});