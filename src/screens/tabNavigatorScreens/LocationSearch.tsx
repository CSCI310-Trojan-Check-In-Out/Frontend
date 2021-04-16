import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Alert} from 'react-native';
import SearchBar from '../../components/SearchBar';
import BuildingList from '../../components/locationSearch/BuildingList';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DocumentPicker from 'react-native-document-picker';
// api
import {
  getAllLocationsApi,
  updateCapacityByCSV,
} from '../../api/backendApiCalls';

export default function LocationSearch({navigation}) {
  const [buildings, setBuildings] = useState<any>([]);
  const [filteredBuildings, setFilteredBuildings] = useState<any>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getBuildings();
  }, [navigation]);

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (res.type !== 'text/comma-separated-values') {
        Alert.alert('', 'Please select CSV files');
      } else {
        updateCapacityByCSV(res.uri, getBuildings);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  function getBuildings() {
    getAllLocationsApi('locationSearch',setBuildings);
  }

  return (
    <>
      {/* <SearchBar placeholder={'Filter search results'} changeText={setQuery} /> */}
    <View testID='LocationSearch1'>
      <Text style={{textAlign: 'center', fontSize: 20, marginTop: 20}}>
        All Locations
      </Text>
      <View style={styles.buildingList}>
        <BuildingList
          buildings={buildings}
          setBuildings={setBuildings}
          getBuildings={getBuildings}></BuildingList>
      </View>
      <View style={{position: 'absolute', bottom: '10%', right: '5%'}}>
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
      <View style={{position: 'absolute', bottom: '20%', right: '5%'}}>
        <TouchableOpacity
          onPress={()=>navigation.navigate("AddLocation",{setBuildings})}
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: 15,
            borderRadius: 50,
          }}>
          <AntDesign name={'plus'} size={30}></AntDesign>
        </TouchableOpacity>
      </View>
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
