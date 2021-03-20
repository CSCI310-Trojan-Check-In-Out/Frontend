import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import SearchBar from '../../components/SearchBar';
import BuildingList from '../../components/locationSearch/BuildingList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
// api
import {getAllLocationsApi} from '../../api/backendApiCalls';

export default function LocationSearch() {
  const [buildings, setBuildings] = useState<any>([]);
  const [filteredBuildings, setFilteredBuildings] = useState<any>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllLocationsApi(setBuildings);
  }, []);

  function searchBuilding(query) {
    fetch('');
  }

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.csv],
      });
      console.log(res.uri, res.type, res.name, res.size);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  return (
    <>
      <SearchBar
        placeholder={'Filter search results'}
        changeText={setQuery}
      />
      <View style={styles.buildingList}>
        <BuildingList buildings={buildings}></BuildingList>
      </View>
      <View style={{position: 'absolute', bottom: '20%', right: '5%'}}>
        <TouchableOpacity
          onPress={handleFilePick}
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: 15,
            borderRadius: 50,
          }}>
          <AntDesign name={'addfile'} size={30}></AntDesign>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    marginTop: '2%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
  buildingList: {
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '1%',
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 20,
  },
});
